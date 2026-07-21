export type SeverityTone = 'critical' | 'warn' | 'info' | 'success' | 'error';

export const severityStyles: Record<SeverityTone, string> = {
  critical: 'border-error/30 bg-error-surface text-error',
  warn: 'border-warn/30 bg-warn-surface text-warn',
  info: 'border-info/30 bg-info-surface text-info',
  success: 'border-success/30 bg-success-surface text-success',
  error: 'border-error/30 bg-error-surface text-error',
};

export const severityRailStyles: Record<SeverityTone, string> = {
  critical: 'border-error',
  warn: 'border-warn',
  info: 'border-info',
  success: 'border-success',
  error: 'border-error',
};
