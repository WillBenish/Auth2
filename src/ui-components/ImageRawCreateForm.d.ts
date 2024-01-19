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
export declare type ImageRawCreateFormInputValues = {
    s3_filename?: string;
    createdAt?: string;
    createdBy?: string;
    originalFileName?: string;
};
export declare type ImageRawCreateFormValidationValues = {
    s3_filename?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    createdBy?: ValidationFunction<string>;
    originalFileName?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ImageRawCreateFormOverridesProps = {
    ImageRawCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    s3_filename?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    createdBy?: PrimitiveOverrideProps<TextFieldProps>;
    originalFileName?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ImageRawCreateFormProps = React.PropsWithChildren<{
    overrides?: ImageRawCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ImageRawCreateFormInputValues) => ImageRawCreateFormInputValues;
    onSuccess?: (fields: ImageRawCreateFormInputValues) => void;
    onError?: (fields: ImageRawCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ImageRawCreateFormInputValues) => ImageRawCreateFormInputValues;
    onValidate?: ImageRawCreateFormValidationValues;
} & React.CSSProperties>;
export default function ImageRawCreateForm(props: ImageRawCreateFormProps): React.ReactElement;
