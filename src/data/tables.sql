
-- Table: public.product

-- DROP TABLE IF EXISTS public.product;

CREATE TABLE IF NOT EXISTS product
(
    product_id integer PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
    name varchar(100) NOT NULL,
    description text NOT NULL,
    brand varchar(20) NOT NULL,
    image_url varchar(255) NOT NULL,
    category varchar(50) NOT NULL,
    price integer,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Table: public.review


CREATE TABLE IF NOT EXISTS review
(
    review_id integer PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
    comment text NOT NULL,
    rate integer,
    product_id integer REFERENCES product,
    created_at timestamp with time zone DEFAULT now()
)



