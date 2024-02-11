import { useSearchParams } from "next/navigation";

export default function useCallbackUrl(): string | null {
    return useSearchParams().get("callbackUrl")
}