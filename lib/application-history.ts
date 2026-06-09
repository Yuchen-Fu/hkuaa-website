const HKUAA_STAFF_HISTORY_DAYS = 30

export function getHkuaaStaffHistoryCutoff() {
  return new Date(Date.now() - HKUAA_STAFF_HISTORY_DAYS * 24 * 60 * 60 * 1000).toISOString()
}
