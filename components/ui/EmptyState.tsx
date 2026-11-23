"use client";

import React from "react";
import Link from "next/link";

interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel: string;
    actionHref?: string;
    onAction?: () => void;
}

export function EmptyState({
    title,
    description,
    actionLabel,
    actionHref,
    onAction,
}: EmptyStateProps) {
    const buttonClasses =
        "mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#A36B49] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#8F5B3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A36B49] focus-visible:ring-offset-2";

    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#D9D0C1] bg-[#F7F4EC]/70 px-4 py-7 text-center">
            <p className="text-sm font-semibold text-[#2C2420]">{title}</p>
            <p className="mt-1 max-w-sm text-xs leading-relaxed text-[#6B5E55]">
                {description}
            </p>

            {actionHref ? (
                <Link href={actionHref} className={buttonClasses}>
                    {actionLabel}
                </Link>
            ) : onAction ? (
                <button type="button" onClick={onAction} className={buttonClasses}>
                    {actionLabel}
                </button>
            ) : null}
        </div>
    );
}
