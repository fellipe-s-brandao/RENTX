import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateSpecificationsDTO {
    name: string,
    description: string
}

interface ISpecificationsRepository {
    create({ name, description }: ICreateSpecificationsDTO) :Promise<void>;
    findByName(name: string): Promise<Specification>;
    findByIds(ids: string[]): Promise<Specification[]>;
}

export { ICreateSpecificationsDTO, ISpecificationsRepository };