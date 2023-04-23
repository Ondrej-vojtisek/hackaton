package cz.moro.hackaton.codebook

import org.json.JSONArray
import org.json.JSONObject


enum class MccCode(val code: String, val description: String) {

    VETERINARY_SERVICES("0742", "Veterinary Services"),
    RESTAURANTS("5812", "Restaurants"),
    GROCERY_STORES("5411", "Grocery Stores, Supermarkets"),
    CLOTHING_STORES("5651", "Clothing Stores"),
    GAS_STATIONS("5541", "Gas Stations"),
    ELECTRONICS_STORES("5732", "Electronics Stores"),
    PHARMACIES("5912", "Pharmacies"),
    DEPARTMENT_STORES("5311", "Department Stores"),
    SPORTING_GOODS_STORES("5941", "Sporting Goods Stores"),
    AIRLINES("4511", "Airlines"),
    AUTOMOBILE_RENTAL("7512", "Automobile Rental"),
    COMPUTER_NETWORK_SERVICES("4816", "Computer Network Services"),
    CONTRACTED_SERVICES_TO_GOVERNMENTS("9754", "Contracted Services to Governments"),
    DIRECT_MARKETING_CATALOG_MERCHANTS("5964", "Direct Marketing - Catalog Merchants"),
    DISCOUNT_STORES("5310", "Discount Stores"),
    DRUG_STORES_AND_PHARMACIES("5912", "Drug Stores and Pharmacies"),
    EDUCATIONAL_SERVICES("8299", "Educational Services"),
    ELECTRIC_RAZOR_STORES("5999", "Electric Razor Stores"),
    FAST_FOOD_RESTAURANTS("5814", "Fast Food Restaurants"),
    FINE_JEWELRY_AND_WATCHES("5094", "Fine Jewelry and Watches"),
    FUEL_DEALERS("5983", "Fuel Dealers"),
    FURNITURE_STORES("5712", "Furniture Stores"),
    GARDEN_SUPPLIES("5261", "Garden Supplies"),
    GIFT_CARD_NOVELTY_AND_SOUVENIR_SHOPS("5947", "Gift, Card, Novelty, and Souvenir Shops"),
    GROCERY_STORES_SUPERMARKETS("5411", "Grocery Stores, Supermarkets"),
    HARDWARE_EQUIPMENT_AND_SUPPLIES("5251", "Hardware, Equipment, and Supplies"),
    HEALTH_AND_BEAUTY_SPAS("7298", "Health and Beauty Spas"),
    HOME_SUPPLY_WAREHOUSE_STORES("5200", "Home Supply, Warehouse Stores"),
    HOTELS_MOTELS_AND_RESORTS("7011", "Hotels, Motels, and Resorts"),
    HOUSEHOLD_APPLIANCE_STORES("5722", "Household Appliance Stores"),
    INSURANCE_UNDERWRITING_PREMIUMS("6300", "Insurance Underwriting, Premiums"),
    JEWELRY_STORES_WATCH_CLOCK_AND_SILVERWARE_STORES("5944", "Jewelry Stores, Watch, Clock, and Silverware Stores"),
    LAUNDRY_CLEANING_SERVICES("7210", "Laundry, Cleaning Services"),
    LUGGAGE_AND_LEATHER_GOODS_STORES("5948", "Luggage and Leather Goods Stores"),
    MEDICAL_AND_DENTAL_LABORATORIES("8071", "Medical and Dental Laboratories"),
    MEN_AND_BOYS_CLOTHING_AND_ACCESSORIES_STORES("5611", "Men's and Boys' Clothing and Accessories Stores"),
    MISCELLANEOUS_AND_SPECIALTY_RETAIL_STORES("5999", "Miscellaneous and Specialty Retail Stores"),
    MOTION_PICTURE_THEATERS("7832", "Motion Picture Theaters"),
    MOTOR_FREIGHT_CARRIERS_AND_TRUCKING("4214", "Motor Freight Carriers and Trucking"),
    MUSIC_STORES_MUSICAL_INSTRUMENTS_PIANO_SHEET_MUSIC("5733", "Music Stores, Musical Instruments, Piano, Sheet Music"),
    NEWS_DEALERS_AND_NEWSSTANDS("5994", "News Dealers and Newsstands"),
    NON_FICTION_BOOK_STORES("5942", "Non-Fiction Book Stores"),
    OFFICE_AND_COMMERCIAL_FURNITURE("5021", "Office and Commercial Furniture"),
    OFFICE_AND_STATIONERY_STORES("5943", "Office and Stationery Stores"),
    OPTICIANS_EYEGLASSES_AND_CONTACT_LENS_STORES("8043", "Opticians, Eyeglasses, and Contact Lens Stores"),
    PACKAGE_STORES_BEER_WINE_AND_LIQUOR("5921", "Package Stores - Beer, Wine, and Liquor"),
    PAINTS_VARNISHES_AND_SUPPLIES("5198", "Paints, Varnishes, and Supplies"),
    PARKING_LOTS_GARAGES("7523", "Parking Lots, Garages"),
    PET_SHOPS_PET_FOOD_AND_SUPPLIES("5995", "Pet Shops, Pet Food, and Supplies"),
    PHOTOGRAPHIC_STUDIOS("7221", "Photographic Studios"),
    PICTURE_VIDEO_PRODUCTION("7829", "Picture/Video Production"),
    PRESCRIPTION_DRUG_STORES("5912", "Prescription Drug Stores"),
    PUBLIC_WAREHOUSING_AND_STORAGE("4225", "Public Warehousing and Storage"),
    RADIO_TELEVISION_AND_STEREO_STORES("5735", "Radio, Television, and Stereo Stores"),
    RECREATIONAL_VEHICLE_RENTALS("7519", "Recreational Vehicle Rentals"),
    RETAIL_BAKERIES("5462", "Retail Bakeries");


    companion object {
        fun getAllAsJson(): String {
            val jsonArray = JSONArray()
            for (mccCode in values()) {
                val jsonObject = JSONObject()
                jsonObject.put("code", mccCode.code)
                jsonObject.put("description", mccCode.description)
                jsonArray.put(jsonObject)
            }
            return jsonArray.toString()
        }
    }
}
