// @material-ui/icons
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LoginIcon from "@mui/icons-material/Login";

// core components/views for Manager layout
import EmployeeManagementPage from "views/employee-management/employee-management-list";
import CategoriesManagementPage from "views/categories-management/categories-management-list";
import OrderManagementPage from "views/order-management/order-management-list";
import ProductManagementPage from "views/product-management/product-management-list";
import StatisticalPage from "views/statistical/statistical";
import LoginPage from "views/login/login-page";
import DiscountManagementPage from "views/discount-management/discount-management-list";
import BrandManagementPage from "views/brand-management/brand-management-list";
import UnitsManagementPage from "views/unit-management/unit-management";
import ImportManagementPage from "views/import-management/import";
import ExportManagementPage from "views/export-management/export";
import CustomerManagementPage from "views/customer-management/customer";
import ManagerManagementPage from "views/manager-management/manager";

const dashboardRoutes = [
  {
    path: "/employee-management",
    name: "Employee Management",
    icon: AssignmentIndIcon,
    component: EmployeeManagementPage,
    layout: "/manager",
  },
  {
    path: "/manager-management",
    name: "Manager Management",
    icon: AssignmentIndIcon,
    component: ManagerManagementPage,
    layout: "/manager",
  },
  {
    path: "/customer-management",
    name: "Customer Management",
    icon: AssignmentIndIcon,
    component: CustomerManagementPage,
    layout: "/manager",
  },
  {
    path: "/categories-management",
    name: "Category Management",
    icon: "inventory",
    component: CategoriesManagementPage,
    layout: "/manager",
  },
  {
    path: "/order-management",
    name: "Order Management",
    icon: ReceiptLongIcon,
    component: OrderManagementPage,
    layout: "/manager",
  },
  {
    path: "/product-management",
    name: "Product Management",
    icon: LocalGroceryStoreIcon,
    component: ProductManagementPage,
    layout: "/manager",
  },
  {
    path: "/discount-management",
    name: "Discount Management",
    icon: LocalGroceryStoreIcon,
    component: DiscountManagementPage,
    layout: "/manager",
  },
  {
    path: "/brand-management",
    name: "Brand Management",
    icon: LocalGroceryStoreIcon,
    component: BrandManagementPage,
    layout: "/manager",
  },
  {
    path: "/unit-management",
    name: "Unit Management",
    icon: LocalGroceryStoreIcon,
    component: UnitsManagementPage,
    layout: "/manager",
  },
  {
    name: "Inventory Management",
    icon: LocalGroceryStoreIcon,
    child: [
      {
        path: "/import-management",
        name: "Import Management",
        icon: LocalGroceryStoreIcon,
        component: ImportManagementPage,
        layout: "/manager",
      },
      {
        path: "/export-management",
        name: "Export Management",
        icon: LocalGroceryStoreIcon,
        component: ExportManagementPage,
        layout: "/manager",
      },
    ],
  },
  {
    path: "/statistical",
    name: "Statistical",
    icon: AssignmentIcon,
    component: StatisticalPage,
    layout: "/manager",
  },
  {
    path: "/login",
    name: "Logout",
    icon: LoginIcon,
    component: LoginPage,
    layout: "/auth",
  },
];

export default dashboardRoutes;
