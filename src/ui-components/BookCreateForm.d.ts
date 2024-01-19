/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type BookCreateFormInputValues = {
    name?: string;
    createdAt?: string;
    cover_s3_key?: string;
    creatorUserId?: string;
    bookPages?: string[];
    intro_video_s3_key?: string;
    outro_video_s3_key?: string;
    raw_book_read_s3_key?: string;
};
export declare type BookCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    cover_s3_key?: ValidationFunction<string>;
    creatorUserId?: ValidationFunction<string>;
    bookPages?: ValidationFunction<string>;
    intro_video_s3_key?: ValidationFunction<string>;
    outro_video_s3_key?: ValidationFunction<string>;
    raw_book_read_s3_key?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BookCreateFormOverridesProps = {
    BookCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    cover_s3_key?: PrimitiveOverrideProps<TextFieldProps>;
    creatorUserId?: PrimitiveOverrideProps<TextFieldProps>;
    bookPages?: PrimitiveOverrideProps<TextFieldProps>;
    intro_video_s3_key?: PrimitiveOverrideProps<TextFieldProps>;
    outro_video_s3_key?: PrimitiveOverrideProps<TextFieldProps>;
    raw_book_read_s3_key?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BookCreateFormProps = React.PropsWithChildren<{
    overrides?: BookCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: BookCreateFormInputValues) => BookCreateFormInputValues;
    onSuccess?: (fields: BookCreateFormInputValues) => void;
    onError?: (fields: BookCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BookCreateFormInputValues) => BookCreateFormInputValues;
    onValidate?: BookCreateFormValidationValues;
} & React.CSSProperties>;
export default function BookCreateForm(props: BookCreateFormProps): React.ReactElement;
