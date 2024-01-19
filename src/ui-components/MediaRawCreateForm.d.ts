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
export declare type MediaRawCreateFormInputValues = {
    type?: string;
    createdAt?: string;
    createdBy?: string;
    originalFileName?: string;
};
export declare type MediaRawCreateFormValidationValues = {
    type?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    createdBy?: ValidationFunction<string>;
    originalFileName?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MediaRawCreateFormOverridesProps = {
    MediaRawCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    type?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    createdBy?: PrimitiveOverrideProps<TextFieldProps>;
    originalFileName?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MediaRawCreateFormProps = React.PropsWithChildren<{
    overrides?: MediaRawCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MediaRawCreateFormInputValues) => MediaRawCreateFormInputValues;
    onSuccess?: (fields: MediaRawCreateFormInputValues) => void;
    onError?: (fields: MediaRawCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MediaRawCreateFormInputValues) => MediaRawCreateFormInputValues;
    onValidate?: MediaRawCreateFormValidationValues;
} & React.CSSProperties>;
export default function MediaRawCreateForm(props: MediaRawCreateFormProps): React.ReactElement;
