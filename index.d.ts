export interface Options {
	protocol?: string;
	hostname?: string;
	port?: string | number;
	pathname?: string;
}

export default function (options?: Options): {
	network: string;
	local: string;
}
