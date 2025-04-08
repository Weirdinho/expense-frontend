import { dashboard, expenses, transactions, trend } from "./icons"

export const menuItems=[
    {
        id:1,
        title:'Dashboard', 
        icon:dashboard,
        link:"/dashboard"
    },
    {
        id:2,
        title:'Budget',
        icon:transactions,
        link:"/dashboard"
    },
    {
        id:3,
        title:'Income',
        icon:trend,
        link:"/dashboard"
    },
    {
        id:4,
        title:'Expense',
        icon:expenses,
        link:"/dashboard"
    },
]