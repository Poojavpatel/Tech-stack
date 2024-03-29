```js
enum COMMON_ERROR_CODES {
  MISSING_REQUIRED_PARAMETERS = "MISSING_REQUIRED_PARAMETERS",
  INVALID_PARAMETER = "INVALID_PARAMETER",
  NOT_FOUND = "NOT_FOUND",
  BAD_REQUEST = "BAD_REQUEST",
  FORBIDDEN = "FORBIDDEN",
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  __NOT_FOUND = "__NOT_FOUND",
  __NOT_ACTIVE = "__NOT_ACTIVE",
  MEMBER_NOT_FOUND = "MEMBER_NOT_FOUND",
  NOTIFICATION_DELIVERY_FAILURE = "NOTIFICATION_DELIVERY_FAILURE",
  FETCH_JOB_DATA_ERROR = "FETCH_JOB_DATA_ERROR",
  JOB_SUBMISSION_FAILED = "JOB_SUBMISSION_FAILED"
}

enum TEMPLATE_ERROR_CODES {
  INVALID_TEMPLATE_ID = "INVALID_TEMPLATE_ID",
  INVALID_TEMPLATE_CATEGORY = "INVALID_TEMPLATE_CATEGORY",
  INVALID_TEMPLATE_DATA = "INVALID_TEMPLATE_DATA",
  UNABLE_TO_BUILD_TEMPLATE = "UNABLE_TO_BUILD_TEMPLATE",
  TEMPLATE_NOT_FOUND = "TEMPLATE_NOT_FOUND"
}

enum FLOW_ERROR_CODES {
  ACCESS_DENIED = "ACCESS_DENIED",
  ACTIVE_OCCURRENCE_ENDED = "ACTIVE_OCCURRENCE_ENDED",
  ACTIVE_OCCURRENCE_ID_MISMATCH = "ACTIVE_OCCURRENCE_ID_MISMATCH",
  AN_ACTIVE_OCCURRENCE_EXISTS = "AN_ACTIVE_OCCURRENCE_EXISTS",
  BLOCK_NOT_FOUND = "BLOCK_NOT_FOUND",
  ERROR_DELETING_FLOW_RESPONSE = "ERROR_DELETING_FLOW_RESPONSE",
  FAILED_TO_CREATE_ACTIVE_OCCURRENCE = "FAILED_TO_CREATE_ACTIVE_OCCURRENCE",
  FAILED_TO_CREATE_FLOW = "FAILED_TO_CREATE_FLOW",
  FAILED_TO_CREATE_SCHEDULED_FLOW = "FAILED_TO_CREATE_SCHEDULED_FLOW",
  FAILED_TO_END_OCCURRENCE = "FAILED_TO_END_OCCURRENCE",
  FAILED_TO_END_SCHEDULE = "FAILED_TO_END_SCHEDULE",
  FAILED_TO_TRIGGER_FLOW = "FAILED_TO_TRIGGER_FLOW",
  FLOW_INSTANCE_NOT_FOUND = "FLOW_INSTANCE_NOT_FOUND",
  FLOW_IS_PUBLISHED = "FLOW_IS_PUBLISHED",
  FLOW_NOT_AVAILABLE = "FLOW_NOT_AVAILABLE",
  FLOW_NOT_FOUND = "FLOW_NOT_FOUND",
  FLOW_OWNER_NOT_FOUND = "FLOW_OWNER_NOT_FOUND",
  FLOW_UPDATED = "FLOW_UPDATED",
  INCOMPLETE_INSTANCE_RESPONSE = "INCOMPLETE_INSTANCE_RESPONSE",
  INSTANCE_CLOSED = "INSTANCE_CLOSED",
  INVALID_BLOCK_ID = "INVALID_BLOCK_ID",
  INVALID_BLOCK_PARAMETERS = "INVALID_BLOCK_PARAMETERS",
  INVALID_FLOW_ID = "INVALID_FLOW_ID",
  INVALID_OCCURRENCE_END_TIME = "INVALID_OCCURRENCE_END_TIME",
  INVALID_OCCURRENCE_ID = "INVALID_OCCURRENCE_ID",
  INVALID_OCCURRENCE_START_TIME = "INVALID_OCCURRENCE_START_TIME",
  NO_ACTIVE_OCCURRENCE_FOUND = "NO_ACTIVE_OCCURRENCE_FOUND",
  NOT_A_FLOW_OWNER = "NOT_A_FLOW_OWNER",
  NOT_A_PERSON_SELECTOR_BLOCK = "NOT_A_PERSON_SELECTOR_BLOCK",
  NOT_ALLOWED_TO_TRIGGER = "NOT_ALLOWED_TO_TRIGGER",
  OCCURRENCE_ALREADY_RESPONDED = "OCCURRENCE_ALREADY_RESPONDED",
  OCCURRENCE_NOT_FOUND = "OCCURRENCE_NOT_FOUND",
  PRIVATE_RESPONSE_NOT_ALLOWED = "PRIVATE_RESPONSE_NOT_ALLOWED",
  SCHEDULE_DOES_NOT_EXIST = "SCHEDULE_DOES_NOT_EXIST",
  SCHEDULE_NOT_FOUND = "SCHEDULE_NOT_FOUND",
  UNABLE_TO_BUILD_INSTANCE_FROM_BLOCKS = "UNABLE_TO_BUILD_INSTANCE_FROM_BLOCKS"
}

export { COMMON_ERROR_CODES, TEMPLATE_ERROR_CODES, FLOW_ERROR_CODES };
```