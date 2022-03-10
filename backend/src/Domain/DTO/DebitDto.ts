class DebitDto {
    private constructor(
        public name: string,
        public value: number,
        public status: string
    ) { }

    static create(name: string, value: number, status: string): DebitDto {
        return new DebitDto(name, value, status);
    }
}

export default DebitDto;