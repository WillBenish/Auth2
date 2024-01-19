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
export declare type ImageRawUpdateFormInputValues = {
    s3_filename?: string;
    createdAt?: string;
    createdBy?: string;
    originalFileName?: string;
};
export declare type ImageRawUpdateFormValidationValues = {
    s3_filename?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    createdBy?: ValidationFunction<string>;
    originalFileName?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ImageRawUpdateFormOverridesProps = {
    ImageRawUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    s3_filename?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    createdBy?: PrimitiveOverrideProps<TextFieldProps>;
    originalFileName?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ImageRawUpdateFormProps = React.PropsWithChildren<{
    overrides?: ImageRawUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    imageRaw?: any;
    onSubmit?: (fields: ImageRawUpdateFormInputValues) => ImageRawUpdateFormInputValues;
    onSuccess?: (fields: ImageRawUpdateFormInputValues) => void;
    onError?: (fields: ImageRawUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ImageRawUpdateFormInputValues) => ImageRawUpdateFormInputValues;
    onValidate?: ImageRawUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ImageRawUpdateForm(props: ImageRawUpdateFormProps): React.ReactElement;
