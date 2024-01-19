/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getBook } from "../graphql/queries";
import { updateBook } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function BookUpdateForm(props) {
  const {
    id: idProp,
    book: bookModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    createdAt: "",
    cover_s3_key: "",
    creatorUserId: "",
    bookPages: [],
    intro_video_s3_key: "",
    outro_video_s3_key: "",
    raw_book_read_s3_key: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [cover_s3_key, setCover_s3_key] = React.useState(
    initialValues.cover_s3_key
  );
  const [creatorUserId, setCreatorUserId] = React.useState(
    initialValues.creatorUserId
  );
  const [bookPages, setBookPages] = React.useState(initialValues.bookPages);
  const [intro_video_s3_key, setIntro_video_s3_key] = React.useState(
    initialValues.intro_video_s3_key
  );
  const [outro_video_s3_key, setOutro_video_s3_key] = React.useState(
    initialValues.outro_video_s3_key
  );
  const [raw_book_read_s3_key, setRaw_book_read_s3_key] = React.useState(
    initialValues.raw_book_read_s3_key
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = bookRecord
      ? { ...initialValues, ...bookRecord }
      : initialValues;
    setName(cleanValues.name);
    setCreatedAt(cleanValues.createdAt);
    setCover_s3_key(cleanValues.cover_s3_key);
    setCreatorUserId(cleanValues.creatorUserId);
    setBookPages(cleanValues.bookPages ?? []);
    setCurrentBookPagesValue("");
    setIntro_video_s3_key(cleanValues.intro_video_s3_key);
    setOutro_video_s3_key(cleanValues.outro_video_s3_key);
    setRaw_book_read_s3_key(cleanValues.raw_book_read_s3_key);
    setErrors({});
  };
  const [bookRecord, setBookRecord] = React.useState(bookModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getBook.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getBook
        : bookModelProp;
      setBookRecord(record);
    };
    queryData();
  }, [idProp, bookModelProp]);
  React.useEffect(resetStateValues, [bookRecord]);
  const [currentBookPagesValue, setCurrentBookPagesValue] = React.useState("");
  const bookPagesRef = React.createRef();
  const validations = {
    name: [],
    createdAt: [],
    cover_s3_key: [],
    creatorUserId: [],
    bookPages: [],
    intro_video_s3_key: [],
    outro_video_s3_key: [],
    raw_book_read_s3_key: [],
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
          name: name ?? null,
          createdAt: createdAt ?? null,
          cover_s3_key: cover_s3_key ?? null,
          creatorUserId: creatorUserId ?? null,
          bookPages: bookPages ?? null,
          intro_video_s3_key: intro_video_s3_key ?? null,
          outro_video_s3_key: outro_video_s3_key ?? null,
          raw_book_read_s3_key: raw_book_read_s3_key ?? null,
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
            query: updateBook.replaceAll("__typename", ""),
            variables: {
              input: {
                id: bookRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "BookUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              createdAt,
              cover_s3_key,
              creatorUserId,
              bookPages,
              intro_video_s3_key,
              outro_video_s3_key,
              raw_book_read_s3_key,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
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
              name,
              createdAt: value,
              cover_s3_key,
              creatorUserId,
              bookPages,
              intro_video_s3_key,
              outro_video_s3_key,
              raw_book_read_s3_key,
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
      <TextField
        label="Cover s3 key"
        isRequired={false}
        isReadOnly={false}
        value={cover_s3_key}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              createdAt,
              cover_s3_key: value,
              creatorUserId,
              bookPages,
              intro_video_s3_key,
              outro_video_s3_key,
              raw_book_read_s3_key,
            };
            const result = onChange(modelFields);
            value = result?.cover_s3_key ?? value;
          }
          if (errors.cover_s3_key?.hasError) {
            runValidationTasks("cover_s3_key", value);
          }
          setCover_s3_key(value);
        }}
        onBlur={() => runValidationTasks("cover_s3_key", cover_s3_key)}
        errorMessage={errors.cover_s3_key?.errorMessage}
        hasError={errors.cover_s3_key?.hasError}
        {...getOverrideProps(overrides, "cover_s3_key")}
      ></TextField>
      <TextField
        label="Creator user id"
        isRequired={false}
        isReadOnly={false}
        value={creatorUserId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              createdAt,
              cover_s3_key,
              creatorUserId: value,
              bookPages,
              intro_video_s3_key,
              outro_video_s3_key,
              raw_book_read_s3_key,
            };
            const result = onChange(modelFields);
            value = result?.creatorUserId ?? value;
          }
          if (errors.creatorUserId?.hasError) {
            runValidationTasks("creatorUserId", value);
          }
          setCreatorUserId(value);
        }}
        onBlur={() => runValidationTasks("creatorUserId", creatorUserId)}
        errorMessage={errors.creatorUserId?.errorMessage}
        hasError={errors.creatorUserId?.hasError}
        {...getOverrideProps(overrides, "creatorUserId")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              createdAt,
              cover_s3_key,
              creatorUserId,
              bookPages: values,
              intro_video_s3_key,
              outro_video_s3_key,
              raw_book_read_s3_key,
            };
            const result = onChange(modelFields);
            values = result?.bookPages ?? values;
          }
          setBookPages(values);
          setCurrentBookPagesValue("");
        }}
        currentFieldValue={currentBookPagesValue}
        label={"Book pages"}
        items={bookPages}
        hasError={errors?.bookPages?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("bookPages", currentBookPagesValue)
        }
        errorMessage={errors?.bookPages?.errorMessage}
        setFieldValue={setCurrentBookPagesValue}
        inputFieldRef={bookPagesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Book pages"
          isRequired={false}
          isReadOnly={false}
          value={currentBookPagesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.bookPages?.hasError) {
              runValidationTasks("bookPages", value);
            }
            setCurrentBookPagesValue(value);
          }}
          onBlur={() => runValidationTasks("bookPages", currentBookPagesValue)}
          errorMessage={errors.bookPages?.errorMessage}
          hasError={errors.bookPages?.hasError}
          ref={bookPagesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "bookPages")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Intro video s3 key"
        isRequired={false}
        isReadOnly={false}
        value={intro_video_s3_key}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              createdAt,
              cover_s3_key,
              creatorUserId,
              bookPages,
              intro_video_s3_key: value,
              outro_video_s3_key,
              raw_book_read_s3_key,
            };
            const result = onChange(modelFields);
            value = result?.intro_video_s3_key ?? value;
          }
          if (errors.intro_video_s3_key?.hasError) {
            runValidationTasks("intro_video_s3_key", value);
          }
          setIntro_video_s3_key(value);
        }}
        onBlur={() =>
          runValidationTasks("intro_video_s3_key", intro_video_s3_key)
        }
        errorMessage={errors.intro_video_s3_key?.errorMessage}
        hasError={errors.intro_video_s3_key?.hasError}
        {...getOverrideProps(overrides, "intro_video_s3_key")}
      ></TextField>
      <TextField
        label="Outro video s3 key"
        isRequired={false}
        isReadOnly={false}
        value={outro_video_s3_key}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              createdAt,
              cover_s3_key,
              creatorUserId,
              bookPages,
              intro_video_s3_key,
              outro_video_s3_key: value,
              raw_book_read_s3_key,
            };
            const result = onChange(modelFields);
            value = result?.outro_video_s3_key ?? value;
          }
          if (errors.outro_video_s3_key?.hasError) {
            runValidationTasks("outro_video_s3_key", value);
          }
          setOutro_video_s3_key(value);
        }}
        onBlur={() =>
          runValidationTasks("outro_video_s3_key", outro_video_s3_key)
        }
        errorMessage={errors.outro_video_s3_key?.errorMessage}
        hasError={errors.outro_video_s3_key?.hasError}
        {...getOverrideProps(overrides, "outro_video_s3_key")}
      ></TextField>
      <TextField
        label="Raw book read s3 key"
        isRequired={false}
        isReadOnly={false}
        value={raw_book_read_s3_key}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              createdAt,
              cover_s3_key,
              creatorUserId,
              bookPages,
              intro_video_s3_key,
              outro_video_s3_key,
              raw_book_read_s3_key: value,
            };
            const result = onChange(modelFields);
            value = result?.raw_book_read_s3_key ?? value;
          }
          if (errors.raw_book_read_s3_key?.hasError) {
            runValidationTasks("raw_book_read_s3_key", value);
          }
          setRaw_book_read_s3_key(value);
        }}
        onBlur={() =>
          runValidationTasks("raw_book_read_s3_key", raw_book_read_s3_key)
        }
        errorMessage={errors.raw_book_read_s3_key?.errorMessage}
        hasError={errors.raw_book_read_s3_key?.hasError}
        {...getOverrideProps(overrides, "raw_book_read_s3_key")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || bookModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || bookModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
