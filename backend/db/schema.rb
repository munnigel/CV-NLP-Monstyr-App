# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_07_13_082343) do
  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.integer "record_id", null: false
    t.integer "blob_id", null: false
    t.datetime "created_at", precision: nil, null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", precision: nil, null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.integer "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "liveposts", force: :cascade do |t|
    t.string "imgUrl"
    t.string "title"
    t.string "category"
    t.string "promotionDate"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pendingposts", force: :cascade do |t|
    t.string "score"
    t.string "imgUrl"
    t.string "title"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "photos", force: :cascade do |t|
    t.text "caption"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "ImgUrl"
    t.string "picture"
  end

  create_table "posts", force: :cascade do |t|
    t.text "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "sp_id"
    t.integer "pid"
    t.string "status"
    t.text "gen_title"
    t.text "gen_categories"
    t.text "categories"
    t.datetime "gen_start_date"
    t.datetime "start_date"
    t.datetime "gen_end_date"
    t.datetime "end_date"
    t.text "gen_tags"
    t.text "tags"
    t.text "od_image"
    t.text "ocr_image"
    t.text "gen_content"
    t.text "images"
    t.text "content"
    t.float "score"
    t.integer "od_latency"
    t.integer "ocr_latency"
    t.integer "ner_date_latency"
    t.integer "ner_categories_latency"
    t.integer "ner_title_latency"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
end
