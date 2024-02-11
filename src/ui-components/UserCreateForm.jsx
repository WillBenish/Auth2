/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createUser } from "../graphql/mutations";
const client = generateClient();
export default function UserCreateForm(props) {
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
    id: "",
    email: "",
    given_name: "",
    family_name: "",
    oauth_provider: "",
    oauth_provider_id: "",
  };
  const [id, setId] = React.useState(initialValues.id);
  const [email, setEmail] = React.useState(initialValues.email);
  const [given_name, setGiven_name] = React.useState(initialValues.given_name);
  const [family_name, setFamily_name] = React.useState(
    initialValues.family_name
  );
  const [oauth_provider, setOauth_provider] = React.useState(
    initialValues.oauth_provider
  );
  const [oauth_provider_id, setOauth_provider_id] = React.useState(
    initialValues.oauth_provider_id
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setId(initialValues.id);
    setEmail(initialValues.email);
    setGiven_name(initialValues.given_name);
    setFamily_name(initialValues.family_name);
    setOauth_provider(initialValues.oauth_provider);
    setOauth_provider_id(initialValues.oauth_provider_id);
    setErrors({});
  };
  const validations = {
    id: [],
    email: [{ type: "Required" }, { type: "Email" }],
    given_name: [],
    family_name: [],
    oauth_provider: [],
    oauth_provider_id: [],
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
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          id,
          email,
          given_name,
          family_name,
          oauth_provider,
          oauth_provider_id,
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
            query: createUser.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "UserCreateForm")}
      {...rest}
    >
      <TextField
        label="Id"
        isRequired={false}
        isReadOnly={false}
        value={id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id: value,
              email,
              given_name,
              family_name,
              oauth_provider,
              oauth_provider_id,
            };
            const result = onChange(modelFields);
            value = result?.id ?? value;
          }
          if (errors.id?.hasError) {
            runValidationTasks("id", value);
          }
          setId(value);
        }}
        onBlur={() => runValidationTasks("id", id)}
        errorMessage={errors.id?.errorMessage}
        hasError={errors.id?.hasError}
        {...getOverrideProps(overrides, "id")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={true}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              email: value,
              given_name,
              family_name,
              oauth_provider,
              oauth_provider_id,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Given name"
        isRequired={false}
        isReadOnly={false}
        value={given_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              email,
              given_name: value,
              family_name,
              oauth_provider,
              oauth_provider_id,
            };
            const result = onChange(modelFields);
            value = result?.given_name ?? value;
          }
          if (errors.given_name?.hasError) {
            runValidationTasks("given_name", value);
          }
          setGiven_name(value);
        }}
        onBlur={() => runValidationTasks("given_name", given_name)}
        errorMessage={errors.given_name?.errorMessage}
        hasError={errors.given_name?.hasError}
        {...getOverrideProps(overrides, "given_name")}
      ></TextField>
      <TextField
        label="Family name"
        isRequired={false}
        isReadOnly={false}
        value={family_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              email,
              given_name,
              family_name: value,
              oauth_provider,
              oauth_provider_id,
            };
            const result = onChange(modelFields);
            value = result?.family_name ?? value;
          }
          if (errors.family_name?.hasError) {
            runValidationTasks("family_name", value);
          }
          setFamily_name(value);
        }}
        onBlur={() => runValidationTasks("family_name", family_name)}
        errorMessage={errors.family_name?.errorMessage}
        hasError={errors.family_name?.hasError}
        {...getOverrideProps(overrides, "family_name")}
      ></TextField>
      <TextField
        label="Oauth provider"
        isRequired={false}
        isReadOnly={false}
        value={oauth_provider}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              email,
              given_name,
              family_name,
              oauth_provider: value,
              oauth_provider_id,
            };
            const result = onChange(modelFields);
            value = result?.oauth_provider ?? value;
          }
          if (errors.oauth_provider?.hasError) {
            runValidationTasks("oauth_provider", value);
          }
          setOauth_provider(value);
        }}
        onBlur={() => runValidationTasks("oauth_provider", oauth_provider)}
        errorMessage={errors.oauth_provider?.errorMessage}
        hasError={errors.oauth_provider?.hasError}
        {...getOverrideProps(overrides, "oauth_provider")}
      ></TextField>
      <TextField
        label="Oauth provider id"
        isRequired={false}
        isReadOnly={false}
        value={oauth_provider_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              email,
              given_name,
              family_name,
              oauth_provider,
              oauth_provider_id: value,
            };
            const result = onChange(modelFields);
            value = result?.oauth_provider_id ?? value;
          }
          if (errors.oauth_provider_id?.hasError) {
            runValidationTasks("oauth_provider_id", value);
          }
          setOauth_provider_id(value);
        }}
        onBlur={() =>
          runValidationTasks("oauth_provider_id", oauth_provider_id)
        }
        errorMessage={errors.oauth_provider_id?.errorMessage}
        hasError={errors.oauth_provider_id?.hasError}
        {...getOverrideProps(overrides, "oauth_provider_id")}
      ></TextField>
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
