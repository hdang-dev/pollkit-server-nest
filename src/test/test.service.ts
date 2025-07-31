import { Model } from "mongoose";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Test } from "./schema/test.schema";
import { CreateTestDto } from "./dto/create-test.dto";
import { UpdateTestDto } from "./dto/update-test.dto";

@Injectable()
export class TestService {
  constructor(@InjectModel(Test.name) private testModel: Model<Test>) {}

  async create(createTestDto: CreateTestDto): Promise<Test> {
    const test = await this.testModel.create(createTestDto);
    return test;
  }

  async findAll(): Promise<Test[]> {
    const tests = await this.testModel.find();
    return tests;
  }

  async findOne(id: string): Promise<Test> {
    const test = await this.testModel.findById(id);
    if (!test) {
      throw new NotFoundException("Test not found.");
    }
    return test;
  }

  async update(id: string, updateTestDto: UpdateTestDto): Promise<Test | null> {
    return await this.testModel.findByIdAndUpdate(id, updateTestDto, {
      new: true,
      runValidators: true
    });
  }

  async remove(id: string): Promise<Test | null> {
    return await this.testModel.findByIdAndDelete(id);
  }
}
