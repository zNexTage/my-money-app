export enum DebitStatus {
    PAGO = 'PAGO',
    PENDENTE = 'PENDENTE',
    AGENDADO = 'AGENDADO'
}

class Debit {
    constructor(
        public name: string,
        public value: number,
        public status: DebitStatus
    ) { }
}

export default Debit;