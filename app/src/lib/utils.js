export const iva = function (monto) {
	return monto - Math.round(monto / 1.19);
};
export const sinIva = (monto) => {
	return Math.round(monto / 1.19);
};
export const conIva = (monto) => {
	return Math.round(monto * 1.19);
};
export const formato = function (monto) {
	return monto.toLocaleString('es-CL');
};
