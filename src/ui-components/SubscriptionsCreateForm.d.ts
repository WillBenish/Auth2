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
export declare type SubscriptionsCreateFormInputValues = {
    creatorId?: string;
    subscriberEmail?: string;
    subscriberId?: string;
    createdAt?: string;
    SubscriptionStatus?: string;
};
export declare type SubscriptionsCreateFormValidationValues = {
    creatorId?: ValidationFunction<string>;
    subscriberEmail?: ValidationFunction<string>;
    subscriberId?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    SubscriptionStatus?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SubscriptionsCreateFormOverridesProps = {
    SubscriptionsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    creatorId?: PrimitiveOverrideProps<TextFieldProps>;
    subscriberEmail?: PrimitiveOverrideProps<TextFieldProps>;
    subscriberId?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    SubscriptionStatus?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type SubscriptionsCreateFormProps = React.PropsWithChildren<{
    overrides?: SubscriptionsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SubscriptionsCreateFormInputValues) => SubscriptionsCreateFormInputValues;
    onSuccess?: (fields: SubscriptionsCreateFormInputValues) => void;
    onError?: (fields: SubscriptionsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SubscriptionsCreateFormInputValues) => SubscriptionsCreateFormInputValues;
    onValidate?: SubscriptionsCreateFormValidationValues;
} & React.CSSProperties>;
export default function SubscriptionsCreateForm(props: SubscriptionsCreateFormProps): React.ReactElement;
