import { Logger, createLogger, format, transports } from "winston";

export const log: Logger = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ timestamp, level, message }) => {
          return `[${level}] ${message}`;
        })
      ),
    }),
  ],
});

export const timezoned = () => {
  return new Date().toISOString();
};

export function initLogger(level: string, file: string) {
  log.level = level;
  log.add(
    new transports.File({
      filename: file,
      options: { flags: "w" },
      format: format.combine(
        format.timestamp({ format: timezoned }),
        format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] [${level}] ${message}`;
        })
      ),
    })
  );
}
