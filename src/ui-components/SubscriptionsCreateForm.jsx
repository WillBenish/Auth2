/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createSubscriptions } from "../graphql/mutations";
const client = generateClient();
export default function SubscriptionsCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    creatorId: "",
    subscriberEmail: "",
    subscriberId: "",
    createdAt: "",
    SubscriptionStatus: "",
  };
  const [creatorId, setCreatorId] = React.useState(initialValues.creatorId);
  const [subscriberEmail, setSubscriberEmail] = React.useState(
    initialValues.subscriberEmail
  );
  const [subscriberId, setSubscriberId] = React.useState(
    initialValues.subscriberId
  );
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [SubscriptionStatus, setSubscriptionStatus] = React.useState(
    initialValues.SubscriptionStatus
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setCreatorId(initialValues.creatorId);
    setSubscriberEmail(initialValues.subscriberEmail);
    setSubscriberId(initialValues.subscriberId);
    setCreatedAt(initialValues.createdAt);
    setSubscriptionStatus(initialValues.SubscriptionStatus);
    setErrors({});
  };
  const validations = {
    creatorId: [],
    subscriberEmail: [{ type: "Email" }],
    subscriberId: [],
    createdAt: [],
    SubscriptionStatus: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          creatorId,
          subscriberEmail,
          subscriberId,
          createdAt,
          SubscriptionStatus,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createSubscriptions.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "SubscriptionsCreateForm")}
      {...rest}
    >
      <TextField
        label="Creator id"
        isRequired={false}
        isReadOnly={false}
        value={creatorId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              creatorId: value,
              subscriberEmail,
              subscriberId,
              createdAt,
              SubscriptionStatus,
            };
            const result = onChange(modelFields);
            value = result?.creatorId ?? value;
          }
          if (errors.creatorId?.hasError) {
            runValidationTasks("creatorId", value);
          }
          setCreatorId(value);
        }}
        onBlur={() => runValidationTasks("creatorId", creatorId)}
        errorMessage={errors.creatorId?.errorMessage}
        hasError={errors.creatorId?.hasError}
        {...getOverrideProps(overrides, "creatorId")}
      ></TextField>
      <TextField
        label="Subscriber email"
        isRequired={false}
        isReadOnly={false}
        value={subscriberEmail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              creatorId,
              subscriberEmail: value,
              subscriberId,
              createdAt,
              SubscriptionStatus,
            };
            const result = onChange(modelFields);
            value = result?.subscriberEmail ?? value;
          }
          if (errors.subscriberEmail?.hasError) {
            runValidationTasks("subscriberEmail", value);
          }
          setSubscriberEmail(value);
        }}
        onBlur={() => runValidationTasks("subscriberEmail", subscriberEmail)}
        errorMessage={errors.subscriberEmail?.errorMessage}
        hasError={errors.subscriberEmail?.hasError}
        {...getOverrideProps(overrides, "subscriberEmail")}
      ></TextField>
      <TextField
        label="Subscriber id"
        isRequired={false}
        isReadOnly={false}
        value={subscriberId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              creatorId,
              subscriberEmail,
              subscriberId: value,
              createdAt,
              SubscriptionStatus,
            };
            const result = onChange(modelFields);
            value = result?.subscriberId ?? value;
          }
          if (errors.subscriberId?.hasError) {
            runValidationTasks("subscriberId", value);
          }
          setSubscriberId(value);
        }}
        onBlur={() => runValidationTasks("subscriberId", subscriberId)}
        errorMessage={errors.subscriberId?.errorMessage}
        hasError={errors.subscriberId?.hasError}
        {...getOverrideProps(overrides, "subscriberId")}
      ></TextField>
      <TextField
        label="Created at"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={createdAt && convertToLocal(new Date(createdAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              creatorId,
              subscriberEmail,
              subscriberId,
              createdAt: value,
              SubscriptionStatus,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
      ></TextField>
      <SelectField
        label="Subscription status"
        placeholder="Please select an option"
        isDisabled={false}
        value={SubscriptionStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              creatorId,
              subscriberEmail,
              subscriberId,
              createdAt,
              SubscriptionStatus: value,
            };
            const result = onChange(modelFields);
            value = result?.SubscriptionStatus ?? value;
          }
          if (errors.SubscriptionStatus?.hasError) {
            runValidationTasks("SubscriptionStatus", value);
          }
          setSubscriptionStatus(value);
        }}
        onBlur={() =>
          runValidationTasks("SubscriptionStatus", SubscriptionStatus)
        }
        errorMessage={errors.SubscriptionStatus?.errorMessage}
        hasError={errors.SubscriptionStatus?.hasError}
        {...getOverrideProps(overrides, "SubscriptionStatus")}
      >
        <option
          children="Offered"
          value="OFFERED"
          {...getOverrideProps(overrides, "SubscriptionStatusoption0")}
        ></option>
        <option
          children="Requested"
          value="REQUESTED"
          {...getOverrideProps(overrides, "SubscriptionStatusoption1")}
        ></option>
        <option
          children="Accepted"
          value="ACCEPTED"
          {...getOverrideProps(overrides, "SubscriptionStatusoption2")}
        ></option>
      </SelectField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
