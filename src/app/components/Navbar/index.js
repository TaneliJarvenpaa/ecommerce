'use client'

import { Fragment } from "react";

const isAdminView=false;
const isAuthUser=true;

export default function Navbar(){

    return<>
    <nav className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200">
        <div className="max-w-screen-x1 flex flex-wrap items-center justify-between mx-auto p-4">
            <div className="flex item-center cursor-pointer">
                <span
                className="slef-center text-2xl fony-semibold whitespace-nowrap">
                    Lauri Joona
                </span>
            </div>
            <div className="flex md:order-2 gap-2">
             {! isAdminView && isAuthUser ?(
                    <Fragment>
                        <button>Account</button>
                        <button>Cart</button>
                    </Fragment>
                ) :null}  
            </div>
        </div>
    </nav>
    </>
    
}
