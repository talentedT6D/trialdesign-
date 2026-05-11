export const SUBMISSIONS_OPEN = true;

export const DEADLINE = new Date("2026-05-10T23:59:00+05:30").getTime();

export const isSubmissionsClosed = () =>
  !SUBMISSIONS_OPEN || Date.now() >= DEADLINE;
