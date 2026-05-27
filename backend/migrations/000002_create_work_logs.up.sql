CREATE TABLE work_logs (
    id           SERIAL PRIMARY KEY,
    date         DATE          NOT NULL,
    work_type_id INTEGER       NOT NULL REFERENCES work_types(id),
    volume       NUMERIC(10,2) NOT NULL,
    unit         VARCHAR(50)   NOT NULL,
    executor     VARCHAR(255)  NOT NULL,
    created_at   TIMESTAMP     NOT NULL DEFAULT NOW()
);