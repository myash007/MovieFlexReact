import { FC, ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

type ProtRouteType = {
    outlet: JSX.Element;
    isLoggedIn: boolean;
    userRole: string;
}

type UserRouteType = {
    outlet: JSX.Element;
    isLoggedIn: boolean;
}

const ProtectedRoute = ({
    isLoggedIn,
    userRole,
    outlet,
}: ProtRouteType) => {
    if (isLoggedIn == true && userRole == "admin") {
        return outlet;
    } else {
        return <Navigate to={'/'} replace />;
    }
};

const CheckUserLogInRoute = ({
    isLoggedIn,
    outlet,
}: UserRouteType) => {
    if (isLoggedIn == true) {
        return outlet;
    } else {
        return <Navigate to={'/login'} replace />;
    }
};

export { ProtectedRoute, CheckUserLogInRoute };