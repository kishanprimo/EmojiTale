import DashboardLayout from "@/layouts/DashboardLayout";
import AvatarLeft from "@/screens/Avatars/AvatarLeft";
import AvatarForm from "@/screens/Avatars/AvatarForm";

export default function EditAvatarPage() {

    return (

        <DashboardLayout>

            <div className="grid grid-cols-12 gap-6 p-6">

                <div className="col-span-3">

                    <AvatarLeft />

                </div>

                <div className="col-span-9">

                    <AvatarForm mode="edit" />

                </div>

            </div>

        </DashboardLayout>

    );

}