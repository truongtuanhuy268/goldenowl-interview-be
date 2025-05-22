import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Student {
  @Prop({ required: true, unique: true })
  sbd: string;

  @Prop({ required: false })
  toan?: number;

  @Prop({ required: false })
  ngu_van?: number;

  @Prop({ required: false })
  ngoai_ngu?: number;

  @Prop({ required: false })
  vat_li?: number;

  @Prop({ required: false })
  hoa_hoc?: number;

  @Prop({ required: false })
  sinh_hoc?: number;

  @Prop({ required: false })
  lich_su?: number;

  @Prop({ required: false })
  dia_li?: number;

  @Prop({ required: false })
  gdcd?: number;

  @Prop({ required: false })
  ma_ngoai_ngu?: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
