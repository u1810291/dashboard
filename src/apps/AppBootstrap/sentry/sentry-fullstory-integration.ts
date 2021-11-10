import * as Sentry from '@sentry/browser';
import * as FullStory from '@fullstory/browser';

/**
 * ADAPTED FROM https://github.com/getsentry/sentry-fullstory/pull/58
 * That PR is only 5 days old, but this unblocks the integration for us without
 * having to wait for it to be published on npm. We can remove this code once
 * that's done.
 * TODO: @pabloscdo to monitor and remove when package is updated.
 *
 * Can't use the packaged published at the time of this commit because it assumes
 * that FullStory is ALWAYS available and ours is initialized asynchronously and
 * conditionally (See fullstory.hook.js), so the original code triggers warnings
 * and errors in cases when its run and FullStory hasn't been initialized.
 *
 * This integration creates a link from the Sentry Error to the FullStory replay.
 * It also creates a link from the FullStory event to the Sentry error.
 * Docs on Sentry SDK integrations are here: https://docs.sentry.io/platforms/javascript/configuration/integrations/custom/
 */

/**
 * Split the URL into different parts
 * taken from https://stackoverflow.com/questions/736513/how-do-i-parse-a-url-into-hostname-and-path-in-javascript
 * @param {string} url
 */
const splitUrlIntoParts = (url: string) => {
  const reURLInformation = new RegExp(
    [
      '^(https?:)//', // protocol
      '(([^:/?#]*)(?::([0-9]+))?)', // host (hostname and port)
      '(/{0,1}[^?#]*)', // pathname
      '(\\?[^#]*|)', // search
      '(#.*|)$', // hash
    ].join(''),
  );
  return url.match(reURLInformation);
};

/**
 * Get the project ID from a Sentry DSN
 * @param {string} dsn
 */
const getProjectIdFromSentryDsn = (dsn: string) => {
  const parts = splitUrlIntoParts(dsn);
  if (!parts) {
    throw new Error('Cannot parse DSN');
  }
  return parts[5].replace('/', '');
};

const isError = (exception: string | Error): exception is Error => (exception as Error).message !== undefined;

/**
 * Get the message and name properties from the original exception
 * @param {EventHint} hint
 */
const getOriginalExceptionProperties = (hint?: Sentry.EventHint): Record<string, string> => {
  if (hint?.originalException && isError(hint.originalException)) {
    const originalException = hint.originalException;
    const { name, message } = originalException;
    return { name, message };
  }

  return {};
};

type Options = {
  baseSentryUrl?: string;
};

class SentryFullStory {
  public readonly name: string = SentryFullStory.id;
  public static id: string = 'SentryFullStory';
  sentryOrg: string;
  baseSentryUrl: string;

  constructor(sentryOrg: string, options: Options = {}) {
    this.sentryOrg = sentryOrg;
    this.baseSentryUrl = options.baseSentryUrl || 'https://sentry.io';
  }

  setupOnce() {
    Sentry.addGlobalEventProcessor((event: Sentry.Event, hint?: Sentry.EventHint) => {
      const getSentryUrl = (): string => {
        // Returns the sentry URL of the error
        // If we cannot get the URL, return a string saying we cannot
        try {
          // No docs on this but the SDK team assures me it works unless you bind another Sentry client
          const { dsn } = Sentry.getCurrentHub().getClient()?.getOptions() || {};
          if (!dsn) {
            console.error('No DSN');
            return 'Could not retrieve url';
          }
          if (!hint) {
            console.error('No event hint');
            return 'Could not retrieve url';
          }
          const projectId = getProjectIdFromSentryDsn(dsn);
          return `${this.baseSentryUrl}/organizations/${this.sentryOrg}/issues/?project=${projectId}&query=${hint.event_id}`;
        } catch (err) {
          console.error('Error retrieving project ID from DSN', err);
          return 'Could not retrieve url';
        }
      };

      const getFullStoryUrl = (): string => {
        // getCurrentSessionURL isn't available until after the FullStory script is fully bootstrapped.
        // If an error occurs before getCurrentSessionURL is ready, make a note in Sentry and move on.
        // More on getCurrentSessionURL here: https://help.fullstory.com/develop-js/getcurrentsessionurl
        try {
          return FullStory.getCurrentSessionURL(true) || 'Current session URL API not ready';
        } catch (e) {
          if (e instanceof Error) {
            return `Unable to get url: ${e.message}`;
          }
          return 'Unable to get url';
        }
      };

      const self = Sentry.getCurrentHub().getIntegration(SentryFullStory);
      // Run the integration ONLY when it was installed on the current Hub
      if (self) {
        // eslint-disable-next-line no-param-reassign
        event.contexts = {
          ...event.contexts,
          fullStory: {
            fullStoryUrl: getFullStoryUrl(),
          },
        };
        try {
          FullStory.event('Sentry Error', {
            sentryUrl: getSentryUrl(),
            ...getOriginalExceptionProperties(hint),
          });
        } catch (e) {
          console.debug('Unable to report sentry error details to FullStory');
        }
      }
      return event;
    });
  }
}

export default SentryFullStory;
