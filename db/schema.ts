import {
  pgTable,
  uuid,
  varchar,
  bigint,
  boolean,
  integer,
  timestamp,
  jsonb,
  bigserial,
  text,
  uniqueIndex,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

/* ─────────────────────────────────────────────
   licenses
   ───────────────────────────────────────────── */

export const licenses = pgTable(
  "licenses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    lemonSqueezyLicenseKey: varchar("lemon_squeezy_license_key", {
      length: 255,
    })
      .unique()
      .notNull(),
    lemonSqueezyOrderId: bigint("lemon_squeezy_order_id", {
      mode: "number",
    }).notNull(),
    lemonSqueezyCustomerId: bigint("lemon_squeezy_customer_id", {
      mode: "number",
    }).notNull(),
    customerEmail: varchar("customer_email", { length: 255 }).notNull(),
    customerName: varchar("customer_name", { length: 255 }),
    activated: boolean("activated").default(false),
    activationLimit: integer("activation_limit").default(3),
    currentActivations: integer("current_activations").default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    expiresAt: timestamp("expires_at", { withTimezone: true }),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    status: varchar("status", { length: 50 }).default("active"),
    metadata: jsonb("metadata").default({}),
  },
  (table) => [
    index("idx_licenses_license_key").on(table.lemonSqueezyLicenseKey),
    index("idx_licenses_status").on(table.status),
  ]
);

export const licensesRelations = relations(licenses, ({ many }) => ({
  activations: many(activations),
  validationLogs: many(validationLogs),
}));

/* ─────────────────────────────────────────────
   activations
   ───────────────────────────────────────────── */

export const activations = pgTable(
  "activations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    licenseId: uuid("license_id")
      .notNull()
      .references(() => licenses.id, { onDelete: "cascade" }),
    machineId: varchar("machine_id", { length: 255 }).notNull(),
    machineName: varchar("machine_name", { length: 255 }),
    activatedAt: timestamp("activated_at", { withTimezone: true }).defaultNow(),
    lastValidatedAt: timestamp("last_validated_at", {
      withTimezone: true,
    }).defaultNow(),
    status: varchar("status", { length: 50 }).default("active"),
  },
  (table) => [
    uniqueIndex("idx_activations_license_machine").on(
      table.licenseId,
      table.machineId
    ),
    index("idx_activations_license_id").on(table.licenseId),
  ]
);

export const activationsRelations = relations(activations, ({ one }) => ({
  license: one(licenses, {
    fields: [activations.licenseId],
    references: [licenses.id],
  }),
}));

/* ─────────────────────────────────────────────
   validation_logs
   ───────────────────────────────────────────── */

export const validationLogs = pgTable(
  "validation_logs",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    licenseId: uuid("license_id"),
    machineId: varchar("machine_id", { length: 255 }),
    validationType: varchar("validation_type", { length: 50 }),
    success: boolean("success").notNull(),
    resultCode: varchar("result_code", { length: 50 }),
    errorMessage: text("error_message"),
    validatedAt: timestamp("validated_at", {
      withTimezone: true,
    }).defaultNow(),
  },
  (table) => [
    index("idx_validation_logs_license_id").on(table.licenseId),
    index("idx_validation_logs_validated_at").on(table.validatedAt),
  ]
);

/* ─────────────────────────────────────────────
   webhook_events
   ───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   refund_requests
   ───────────────────────────────────────────── */

export const refundRequests = pgTable(
  "refund_requests",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    email: varchar("email", { length: 255 }).notNull(),
    orderId: varchar("order_id", { length: 255 }).notNull(),
    reason: text("reason"),
    status: varchar("status", { length: 50 }).notNull().default("pending"),
    lemonSqueezyRefundId: varchar("lemon_squeezy_refund_id", { length: 255 }),
    errorMessage: text("error_message"),
    requestIp: varchar("request_ip", { length: 45 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    processedAt: timestamp("processed_at", { withTimezone: true }),
  },
  (table) => [
    index("idx_refund_requests_email").on(table.email),
    index("idx_refund_requests_order_id").on(table.orderId),
    index("idx_refund_requests_created_at").on(table.createdAt),
  ]
);

/* ─────────────────────────────────────────────
   webhook_events
   ───────────────────────────────────────────── */

export const webhookEvents = pgTable(
  "webhook_events",
  {
    id: bigserial("id", { mode: "number" }).primaryKey(),
    eventType: varchar("event_type", { length: 100 }).notNull(),
    lemonSqueezyEventId: varchar("lemon_squeezy_event_id", {
      length: 255,
    }).unique(),
    payload: jsonb("payload").notNull(),
    processed: boolean("processed").default(false),
    errorMessage: text("error_message"),
    receivedAt: timestamp("received_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [index("idx_webhook_events_event_type").on(table.eventType)]
);

/* ─────────────────────────────────────────────
   articles
   ───────────────────────────────────────────── */

export const articles = pgTable(
  "articles",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").unique().notNull(),
    title: text("title").notNull(),
    summary: text("summary").notNull(),
    body: text("body").notNull(),
    category: varchar("category", { length: 50 }).notNull().default("news"),
    publishedAt: timestamp("published_at", { withTimezone: true }).notNull(),
    sourceUrl: text("source_url"),
    isFeatured: boolean("is_featured").default(false),
    imageUrl: text("image_url"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_articles_slug").on(table.slug),
    index("idx_articles_category").on(table.category),
    index("idx_articles_published_at").on(table.publishedAt),
    index("idx_articles_is_featured").on(table.isFeatured),
  ]
);
