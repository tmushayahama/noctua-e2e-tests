export interface AnnotationData {
    input: string;
    optionId: string;
}

export interface TestData {
    modelId: string;
    annotations: AnnotationData[];
}