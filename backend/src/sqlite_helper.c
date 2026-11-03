#include "../vendor/sqlite3.h"
#include <stdlib.h>
#include <string.h>

/* Database open: returns pointer or NULL */
void* crm_db_open(const char* path) {
    sqlite3* db = 0;
    if (sqlite3_open(path, &db) != SQLITE_OK) {
        if (db) sqlite3_close(db);
        return 0;
    }
    return (void*)db;
}

void crm_db_close(void* db) {
    if (db) sqlite3_close((sqlite3*)db);
}

int crm_exec(void* db, const char* sql) {
    char* err = 0;
    int rc = sqlite3_exec((sqlite3*)db, sql, 0, 0, &err);
    if (err) sqlite3_free(err);
    return rc;
}

const char* crm_errmsg(void* db) {
    if (!db) return "";
    const char* m = sqlite3_errmsg((sqlite3*)db);
    return m ? m : "";
}

void* crm_prepare(void* db, const char* sql) {
    sqlite3_stmt* stmt = 0;
    if (sqlite3_prepare_v2((sqlite3*)db, sql, -1, &stmt, 0) != SQLITE_OK) {
        return 0;
    }
    return (void*)stmt;
}

int crm_step(void* stmt) {
    return sqlite3_step((sqlite3_stmt*)stmt);
}

int crm_finalize(void* stmt) {
    return sqlite3_finalize((sqlite3_stmt*)stmt);
}

int crm_column_count(void* stmt) {
    return sqlite3_column_count((sqlite3_stmt*)stmt);
}

const char* crm_column_text(void* stmt, int i) {
    const unsigned char* t = sqlite3_column_text((sqlite3_stmt*)stmt, i);
    return t ? (const char*)t : "";
}

int crm_column_int(void* stmt, int i) {
    return sqlite3_column_int((sqlite3_stmt*)stmt, i);
}

double crm_column_double(void* stmt, int i) {
    return sqlite3_column_double((sqlite3_stmt*)stmt, i);
}

int crm_bind_text(void* stmt, int index, const char* value) {
    return sqlite3_bind_text((sqlite3_stmt*)stmt, index, value, -1, SQLITE_TRANSIENT);
}

int crm_bind_int(void* stmt, int index, int value) {
    return sqlite3_bind_int((sqlite3_stmt*)stmt, index, value);
}

int crm_bind_double(void* stmt, int index, double value) {
    return sqlite3_bind_double((sqlite3_stmt*)stmt, index, value);
}

void crm_reset(void* stmt) {
    sqlite3_reset((sqlite3_stmt*)stmt);
    sqlite3_clear_bindings((sqlite3_stmt*)stmt);
}
