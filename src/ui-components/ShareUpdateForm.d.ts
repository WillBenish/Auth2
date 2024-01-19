/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type ShareUpdateFormInputValues = {
    book?: string;
    shareType?: string;
    recipient?: string;
};
export declare type ShareUpdateFormValidationValues = {
    book?: ValidationFunction<string>;
    shareType?: ValidationFunction<string>;
    recipient?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ShareUpdateFormOverridesProps = {
    ShareUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    book?: PrimitiveOverrideProps<TextFieldProps>;
    shareType?: PrimitiveOverrideProps<SelectFieldProps>;
    recipient?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ShareUpdateFormProps = React.PropsWithChildren<{
    overrides?: ShareUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    share?: any;
    onSubmit?: (fields: ShareUpdateFormInputValues) => ShareUpdateFormInputValues;
    onSuccess?: (fields: ShareUpdateFormInputValues) => void;
    onError?: (fields: ShareUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ShareUpdateFormInputValues) => ShareUpdateFormInputValues;
    onValidate?: ShareUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ShareUpdateForm(props: ShareUpdateFormProps): React.ReactElement;
