/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from "react";
import { Route, Routes, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import PrivateRoute from "./privateRoute";
import { ROLE } from "../constants/role";

// ********************************
// import Page from index.ts
const DashBoard = lazy(() => import("../pages/dashboard/DashBoard"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const SignUpPage = lazy(() => import("../pages/auth/SingUpPage"));
const UserManagementPage = lazy(
  () => import("../pages/user/UserManagementPage")
);
const ResultListPage = lazy(() => import("../pages/instuctor/ResultList"));
const ListCoursePage = lazy(() => import("../pages/courses/ListCoursePage"));
const CreateCoursePage = lazy(
  () => import("../pages/courses/CreateCoursePage")
);
const OrderListPage = lazy(() => import("../pages/order/OrderList"));
const TeacherListPage = lazy(() => import("../pages/user/TeacherListScreen"));
const StartPage = lazy(() => import("../pages/start/StartPage"));
const WaitPage = lazy(() => import("../pages/wait/WaitPage"));
const PaymentPage = lazy(() => import("../pages/payment/PaymentPage"));
const TransactionPage = lazy(() => import("../pages/payment/TransactionPage"));
// end import pages
// ********************************

export const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <MainLayout>
        <Routes>
          <Route
            path="dashboard"
            element={
              <Suspense fallback={<></>}>
                <PrivateRoute inverted={false} requiredRoles={[ROLE.ADMIN]}>
                  <DashBoard />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="user"
            element={
              <Suspense fallback={<></>}>
                <PrivateRoute inverted={false} requiredRoles={[ROLE.ADMIN]}>
                  <UserManagementPage />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="create-course"
            element={
              <Suspense fallback={<></>}>
                <PrivateRoute inverted={false} requiredRoles={[ROLE.ADMIN]}>
                  <CreateCoursePage />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="course"
            element={
              <Suspense fallback={<></>}>
                <PrivateRoute inverted={false} requiredRoles={[ROLE.ADMIN]}>
                  <ListCoursePage />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="order-list"
            element={
              <Suspense fallback={<></>}>
                <PrivateRoute inverted={false} requiredRoles={[ROLE.ADMIN]}>
                  <OrderListPage />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="result-list"
            element={
              <Suspense fallback={<></>}>
                <PrivateRoute
                  inverted={false}
                  requiredRoles={[ROLE.INSTRUCTOR]}
                >
                  <ResultListPage />
                </PrivateRoute>
              </Suspense>
            }
          />
          <Route
            path="teacher-list"
            element={
              <Suspense fallback={<></>}>
                <PrivateRoute inverted={false} requiredRoles={[ROLE.ADMIN]}>
                  <TeacherListPage />
                </PrivateRoute>
              </Suspense>
            }
          />
        </Routes>
      </MainLayout>
    ),
  },
  {
    path: "login",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <SignUpPage />,
  },
  {
    path: "instructor",
    children: [
      {
        path: "start",
        element: (
          <PrivateRoute inverted={false} requiredRoles={[ROLE.INSTRUCTOR]}>
            <StartPage />
          </PrivateRoute>
        ),
      },
      {
        path: "wait",
        element: (
          <PrivateRoute inverted={false} requiredRoles={[ROLE.INSTRUCTOR]}>
            <WaitPage />
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute inverted={false} requiredRoles={[ROLE.INSTRUCTOR]}>
            <PaymentPage />
          </PrivateRoute>
        ),
      },
      {
        path: "transaction",
        element: (
          <PrivateRoute inverted={false} requiredRoles={[ROLE.INSTRUCTOR]}>
            <TransactionPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
