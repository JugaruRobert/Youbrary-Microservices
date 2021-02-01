"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const uuid_1 = require("uuid");
const book_1 = require("./book");
const book_service_1 = require("./book.service");
let BookController = class BookController {
    constructor(bookService) {
        this.bookService = bookService;
    }
    async getAllBooksByUserEmail(email) {
        return await this.bookService.getAllBooksByUserEmail(email);
    }
    async getByID(bookID) {
        const book = this.bookService.getBookByID(bookID);
        if (!book)
            throw new common_1.NotFoundException("Book not found");
        return book;
    }
    async addBook(book) {
        if (!book.id)
            book.id = uuid_1.v4();
        return this.bookService.saveBook(book);
    }
    async update(book) {
        const databaseBook = this.bookService.getBookByID(book.id);
        if (!databaseBook) {
            throw new common_1.GoneException();
        }
        return this.bookService.saveBook(book);
    }
    async deleteBook(bookID) {
        const book = this.bookService.getBookByID(bookID);
        if (!book) {
            throw new common_1.GoneException();
        }
        this.bookService.deleteBook(bookID);
    }
};
__decorate([
    microservices_1.MessagePattern('getAllBooksByEmail'),
    common_1.Get(':email'),
    __param(0, common_1.Param('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getAllBooksByUserEmail", null);
__decorate([
    microservices_1.MessagePattern('getBookByID'),
    common_1.Get('/bookID/:bookID'),
    __param(0, common_1.Param('bookID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getByID", null);
__decorate([
    microservices_1.MessagePattern('addBook'),
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_1.Book]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "addBook", null);
__decorate([
    microservices_1.MessagePattern('updateBook'),
    common_1.Put(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_1.Book]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "update", null);
__decorate([
    microservices_1.EventPattern('deleteBook'),
    common_1.Delete(':bookID'),
    __param(0, common_1.Param('bookID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "deleteBook", null);
BookController = __decorate([
    common_1.Controller('books'),
    __metadata("design:paramtypes", [book_service_1.BookService])
], BookController);
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map