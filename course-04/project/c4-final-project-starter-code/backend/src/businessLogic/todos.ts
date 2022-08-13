import { TodosAccess } from '../dataAccessLayer/todosAcess';
import { AttachmentUtils } from '../helpers/attachmentUtils';
import { TodoItem } from '../models/TodoItem';
import { TodoUpdate } from '../models/TodoUpdate';
import { CreateTodoRequest } from '../requests/CreateTodoRequest';
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';
//import { createLogger } from '../utils/logger'
//import * as uuid from 'uuid'
//import * as createError from 'http-errors'

// TODO: Implement businessLogic
const uuidv4 = require('uuid/v4');
const toDoAccess = new TodosAccess();
const attachmentUtils = new AttachmentUtils();

export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
    return toDoAccess.getAllTodo(userId);
}

export function createTodo(createTodoRequest: CreateTodoRequest, userId: string): Promise<TodoItem> {
    const todoId =  uuidv4();
    //const s3BucketName = process.env.ATTACHMENT_S3_BUCKET;
    
    return toDoAccess.createTodo({
        userId: userId,
        todoId: todoId,
        //attachmentUrl:  `https://${s3BucketName}.s3.amazonaws.com/${todoId}`, 
        createdAt: new Date().getTime().toString(),
        done: false,
        ...createTodoRequest,
    });
}

export function updateTodo(updateTodoRequest: UpdateTodoRequest, todoId: string, userId: string): Promise<TodoUpdate> {
    return toDoAccess.updateTodo(updateTodoRequest, todoId, userId);
}

export function deleteTodo(todoId: string, userId: string): Promise<string> {
    return toDoAccess.deleteTodo(todoId, userId);
}

export function createAttachmentPresignedUrl(todoId: string, userId: string): Promise<string> {
    return attachmentUtils.generateUploadUrl(todoId, userId);
}