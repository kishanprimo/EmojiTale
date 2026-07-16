interface TogglableSwitchProps {
    isActive: boolean;
    onToggle: () => void;
    activeLabel?: string;
    inactiveLabel?: string;
    activeClassName?: string;
    inactiveClassName?: string;
    badgeClassName?: string;
    showLabel?: boolean;
}

export default function TogglableSwitch({
    isActive,
    onToggle,
    activeLabel = "Active",
    inactiveLabel = "Inactive",
    activeClassName = "text-emerald-500 bg-emerald-50",
    inactiveClassName = "text-gray-400 bg-gray-100",
    showLabel = true,
}: TogglableSwitchProps) {
    return (
        <div className="flex items-center gap-3">
            <button
                type="button"
                onClick={onToggle}
                className={`relative inline-flex h-5.5 w-11 shrink-0 cursor-pointer rounded-full ${isActive ? "bg-emerald-500" : "bg-gray-200"
                    }`}
            >
                <span
                    className={`pointer-events-none inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out mt-0.5 ml-0.5 ${isActive ? "translate-x-5.5" : "translate-x-0"
                        }`}
                />
            </button>
            {showLabel && (
                <span
                    className={`px-3 py-1 rounded-full text-[13px] font-medium text-center min-w-20 ${isActive ? activeClassName : inactiveClassName
                        }`}
                >
                    {isActive ? activeLabel : inactiveLabel}
                </span>
            )}
        </div>
    );
}
