import { getStatusCodeGroup } from "@/utils/helpers/get-status-code-group";

export class SimplrResponse {
    status: number;
    data: any;
    statusText: string;
    statusGroup: string;

    private constructor(status: number, data: any, statusText: string, statusGroup: string) {
        this.status = status;
        this.data = data;
        this.statusText = statusText;
        this.statusGroup = statusGroup;
    }

    static async fromResponse(response: Response): Promise<SimplrResponse> {
        const data = JSON.parse(await response.text());
        const statusGroup = getStatusCodeGroup(response.status);
        return new SimplrResponse(response.status, data, response.statusText, statusGroup);
    }
}