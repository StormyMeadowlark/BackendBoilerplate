const { createQueue, addJob } = require("./bullmq");
const { DateTime } = require("luxon");
const pricingMap = require("./usagePricingMap");

const usageQueue = createQueue("usage-events");

module.exports = async function trackUsage({
  tenantId,
  tenantType,
  userId,
  userRole,
  microservice,
  action,
  meta = {},
}) {
  const key = `${microservice}:${action}`;
  const creditCost = pricingMap[key] ?? 1; // default cost fallback

  const isoTimestamp = new Date().toISOString();
  const readableTime = DateTime.now().toLocaleString(
    DateTime.DATETIME_FULL_WITH_SECONDS
  );

  await addJob(usageQueue, {
    tenantId,
    tenantType,
    userId,
    userRole,
    microservice,
    action,
    creditCost,
    timestamp: isoTimestamp,
    readableTime,
    meta,
  });
};
