export default function useUserHouseId() {
    if (typeof window !== 'undefined') {
        return localStorage.getItem("user_house_id") || "-1";
    }
    return "-1"
}
