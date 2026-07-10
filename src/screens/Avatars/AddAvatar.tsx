import AvatarLeft from "./AvatarLeft";
import AvatarForm from "./AvatarForm";

export default function AddAvatar() {

    return (

        <div className="h-full bg-gray-50">

            <div className="h-full p-6">

                <div className="grid grid-cols-1 xl:grid-cols-[320px_1fr] gap-6 h-full">

                    {/* Left Panel */}

                    <div className="h-full">

                        <AvatarLeft />

                    </div>

                    {/* Right Panel */}

                    <div className="h-full">

                        <AvatarForm mode="add" />

                    </div>

                </div>

            </div>

        </div>

    );

}