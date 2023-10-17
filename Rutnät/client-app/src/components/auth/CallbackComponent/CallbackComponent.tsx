import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import userManager from "../../../auth/authService";
import { PageContainer } from "../../layout/PageContainer";

export const CallbackComponent: React.FC = () => {
    const navigate = useNavigate();
    const hasHandledCallback = useRef(false);
    let message = "Processing authentication...";

    async function handleRedirectCallback() {
        return await userManager.signinRedirectCallback();
    }

    useEffect(() => {
        async function handleLoginCallback() {
            if (!hasHandledCallback.current) {
                try {
                    await handleRedirectCallback();
                } catch (err) {
                    message = "Something went wrong, redirecting to login...";
                } finally   {
                    hasHandledCallback.current = true;
                    navigate("/");
                }
            }
        }
        handleLoginCallback();
    }, [navigate]);

    return <PageContainer>{message}</PageContainer>;
};

