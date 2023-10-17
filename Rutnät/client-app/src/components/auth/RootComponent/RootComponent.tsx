import React, { FC, useState, useEffect } from "react";
import { useAuth } from "../AuthContext/AuthContext";
import { Home } from "../../Home";
import { LoginPage } from "../../LoginPage";

export const RootComponent: FC = () => {
let { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Home />;
    } else {
        return <LoginPage />;
    }
}
