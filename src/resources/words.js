import { Component } from "react";

class Words extends Component {
  static app_name = "آمار بیمارستانی";
  static app_company = "تجارت وب شمال";
  static unhandled_exception = "خطایی در سامانه رخ داده است";
  static copyright =
    "تمامی حقوق این سامانه متعلق به شرکت تجارت وب شمال می باشد";
  static main_menu = "منوی اصلی";
  static search = "جستجو";
  static clear = "پاکسازی";
  static reload = "بارگذاری مجدد";
  static new = "جدید";
  static edit = "ویرایش";
  static delete = "حذف";
  static newInfo = "ثبت اطلاعات";
  static editInfo = "ویرایش اطلاعات";
  static submit = "ثبت";
  static search_text = "متن جستجو";
  static empty_data = "اطلاعاتی برای نمایش وجود ندارد";
  static id = "شناسه";
  static title = "عنوان";
  static activeBed = "تخت فعال";
  static sectionActiveBeds = "تخت فعال بخش ها";
  static yes = "بله";
  static no = "خیر";
  static ok = "اعمال";
  static cancel = "انصراف";
  static excel = "اکسل";
  static view_all = "نمایش همه";
  static username = "نام کاربری";
  static password = "رمز عبور";
  static login_to_app = "ورود به سامانه";
  static logout = "خروج";
  static status = "وضعیت";
  static active = "فعال";
  static inactive = "غیرفعال";
  static accesses = "دسترسی ها";
  static can_add = "امکان ثبت";
  static can_edit = "امکان ویرایش";
  static can_delete = "امکان حذف";
  static can_view = "امکان مشاهده";
  static role = "سمت";
  static roles = "سمت ها";
  static close = "بستن";
  static hour = "ساعت";
  static privillage = "مجوز";
  static download = "دانلود";
  static view_image = "مشاهده تصویر";
  static reg_date = "تاریخ ثبت";
  static reg_time = "زمان ثبت";
  static first_name = "نام";
  static last_name = "نام خانوادگی";
  static reg_date_time = "تاریخ و زمان ثبت";
  static full_name = "نام و نام خانوادگی";
  static member_id = "شناسه کاربر";
  static national_code = "کد ملی";
  static mobile = "موبایل";
  static account_status = "وضعیت حساب کاربری";
  static gender = "جنسیت";
  static male = "آقا";
  static female = "خانم";
  static male_female = "خانم/آقا";
  static active_inactive = "فعال/غیرفعال";
  static person = "نفر";
  static radif = "ردیف";
  static from_date = "از تاریخ";
  static to_date = "تا تاریخ";
  static from = "از";
  static to = "تا";
  static type = "نوع";
  static percent = "درصد";
  static reg_date = "تاریخ ثبت";
  static reg_time = "زمان ثبت";
  static save_settings = "ذخیره تنظیمات";
  static search_text = "متن جستجو";
  static clear = "پاکسازی";
  static view_all = "نمایش همه";
  static excel = "اکسل";
  static new = "جدید";
  static select_please = "انتخاب کنید";
  static parent_department = "دپارتمان والد";
  static office_tel = "تلفن ثابت";
  static fax = "فکس";
  static address = "آدرس";
  static postal_code = "کدپستی";
  static national_id = "شناسه ملی";
  static financial_code = "کد اقتصادی";
  static reg_no = "شماره ثبت";
  static more_details = "جزئیات بیشتر";
  static confirm = "تایید";
  static fix_tel = "تلفن ثابت";
  static birth_date = "تاریخ تولد";
  static profile_image = "تصویر پروفایل";
  static reg_member = "ثبت کننده";
  static attached_file = "فایل پیوست";
  static select_file = "انتخاب فایل";
  static max_file_size = "حداکثر ظرفیت فایل جهت آپلود یک مگابایت می باشد";
  static max_file_size_1 = "حداکثر ظرفیت فایل آپلود ";
  static max_file_size_2_mb = " مگابایت می باشد";
  static max_file_size_2_kb = " کیلوبایت می باشد";
  static limit_upload_file_size =
    "حجم فایل شما بیشتر از مقدار تعیین شده می باشد";
  static department_manager = "مدیر دپارتمان";
  static department_supervisor = "سرپرست دپارتمان";
  static descriptions = "توضیحات";
  static generate_random_account_info = "تولید نام کاربری و رمز عبور تصادفی";
  static color_code = "کد رنگ";
  static color_id = "شناسه رنگ";
  static show_order = "ترتیب نمایش";
  static move_up = "انتقال به بالا";
  static move_down = "انتقال به پایین";
  static duty_title = "عنوان وظیفه";
  static remove_image = "حذف تصویر";
  static reload_image = "بازیابی تصویر";
  static invalid_national_code = "کدملی نامعتبر";
  static settings = "تنظیمات سامانه";
  static admin_panel = "پنل مدیریت";
  static basic_settings = "اطلاعات پایه";
  static nafar = "نفر";
  static no_employee = "بدون کارمند!";
  static no_department_manager_or_supervisor = "بدون مدیر یا سرپرست!";
  static vacation_format = "قالب مرخصی";
  static mission_format = "قالب ماموریت";
  static by_day = "روزانه";
  static by_hour = "ساعتی";
  static submit_crop = "ثبت تصویر برش داده شده";
  static new_image = "تصویر جدید";
  static past_image = "تصویر قبلی";
  static re_cut = "برش مجدد";
  static please_wait = "لطفا صبر کنید ...";
  static please_wait_for_load_image = "لطفا تا بارگذاری تصویر شکیبا باشید ...";
  static visit_profile = "مشاهده حساب کاربری";
  static logout_from_account = "خروج از حساب کاربری";
  static date = "تاریخ";
  static time = "زمان";
  static holiday_date = "تاریخ تعطیلی";
  static can_add = "امکان ثبت";
  static can_edit = "امکان ویرایش";
  static can_delete = "امکان حذف";
  static can_view = "امکان مشاهده";
  static back = "بازگشت";
  static your_duties = "شرح وظایف شما";
  static member_duties = "شرح وظایف پرسنل";
  static duty_type = "نوع وظیفه";
  static by_personal = "فردی";
  static by_role = "سمت";
  static by_role_personal = "سمت - فردی";
  static work_shifts = "شیفت های کاری";
  static work_shift = "شیفت کاری";
  static shift_code = "کد شیفت";
  static start_time = "زمان شروع";
  static finish_time = "زمان پایان";
  static un_delay_in_min = "عدم محاسبه تاخیر";
  static un_hurryup_in_min = "عدم محاسبه تعجیل";
  static un_extra_enter_in_min = "عدم محاسبه اضافه کاری ورود";
  static un_extra_exit_in_min = "عدم محاسبه اضافه کاری خروج";
  static group_shifts = "شیفت های گروهی";
  static shift_date = "تاریخ شیفت";
  static start_date = "تاریخ شروع";
  static finish_date = "تاریخ پایان";
  static employee_shifts = "شیفت های فردی";
  static month = "ماه";
  static year = "سال";
  static week_day = "روز هفته";
  static holiday = "تعطیل";
  static card_no = "شماره کارت";
  static is_married = "وضعیت تاهل";
  static marriage_date = "تاریخ ازدواج";
  static father_name = "نام پدر";
  static personal_id = "شماره شناسنامه";
  static latest_edu_average = "آخرین معدل تحصیلی";
  static employment_start_date = "تاریخ شروع کار";
  static employment_finish_date = "تاریخ پایان کار";
  static single = "مجرد";
  static married = "متاهل";
  static marriage_status = "وضعیت تاهل";
  static reged_cards = "ترددهای ثبت شده";
  static reg_type = "نوع ثبت";
  static security_guard_reg_id = "شناسه ثبت نگهبان";
  static manual_reg_date = "تاریخ ثبت دستی";
  static manual_reg_time = "ساعت ثبت دستی";
  static registerar = "ثبت کننده";
  static manual_reg_date_time = "تاریخ و ساعت ثبت دستی";
  static my_cartable = "کارتابل من";
  static security_cartable = "کارتابل نگهبانی";
  static department_cartable = "کارتابل دپارتمان";
  static official_cartable = "کارتابل اداری";
  static is_transfered_to_member_reged_cards = "انتقال یافته به تردد اصلی";
  static transfered_to_member_reged_cards = "انتقال به تردد اصلی";
  static is_transfered = "انتقال یافته";
  static transferer = "انتقال دهنده";
  static transfer_date = "تاریخ انتقال";
  static transfer_time = "ساعت انتقال";
  static security_guard_reg_date_time = "تاریخ و زمان ثبت نگهبان";
  static security_guard_descriptions = "توضیحات نگهبان";
  static swap_member = "کارمند جایگزین";
  static from_time = "ساعت شروع";
  static to_time = "ساعت پایان";
  static in_progress = "درحال بررسی";
  static accepted = "تایید شده";
  static rejected = "رد شده";
  static accept_request = "تایید درخواست";
  static reject_request = "رد درخواست";
  static search_type = "نوع جستجو";
  static submit_response = "ثبت پاسخ";
  static your_response = "پاسخ شما";
  static im_accept_replace_work_request = "درخواست جانشینی را می پذیرم";
  static im_not_accept_replace_work_request = "درخواست جانشینی را نمی پذیرم";
  static im_accept_request = "درخواست را تایید می کنم";
  static im_not_accept_request = "درخواست را تایید نمی کنم";
  static manager = "مدیر";
  static official_manager = "مسئول اداری";
  static swap_member_response = "پاسخ جانشین";
  static new_swap_member = "کارمند جایگزین جدید";
  static reg_info = "اطلاعات ثبت";
  static request_status = "وضعیت درخواست";
  static in_province = "داخل استان";
  static requirements = "نیازمندی ها";
  static transmission_manager = "مسئول ترابری";
  static transmission_info = "اطلاعات ترابری";
  static mission_report = "گزارش ماموریت";
  static report_text = "متن گزارش";
  static need_correction = "اعلام نقص";
  static notes = "یادداشت ها";
  static mission_notes = "یادداشت های ماموریت";
  static note_text = "متن یادداشت";
  static visible_for_employee = "نمایش برای کارمند";
  static note_visible_for_employee = "عدم نمایش برای کارمند";
  static new_note = "یادداشت جدید";
  static edit_note = "ویرایش یادداشت";
  static department_extra_work_capacities = "ظرفیت اضافه کار دپارتمان ها";
  static capacity_in_hours = "ظرفیت (ساعت)";
  static extra_work_command_sources = "منابع دستور اضافه کار";
  static extra_work_command_source = "منبع دستور اضافه کار";
  static tasks = "مدیریت وظایف";
  static tags = "برچسب ها";
  static interval_tasks = "وظایف تکرارشونده";
  static response_member = "پیگیری کننده";
  static interval_type = "نوع تکرار";
  static task_info = "اطلاعات وظیفه";
  static timing = "زمانبندی";
  static run_time = "زمان اجرا";
  static supervisors = "ناظران";
  static extra_work_capacity = "ظرفیت اضافه کاری";
  static request_duration = "مدت درخواست";
  static total_request_duration = "مجموع مدت درخواست";
  static with_fee = "با حقوق";
  static without_fee = "بدون حقوق";
  static fee_status = "وضعیت حقوق";
  static no_alternative_employees = "پرسنل بدون جانشین";
  static response = "پاسخ";
  static no_alternative_employee = "بدون جانشین";
  static age = "سن";

  static total = "کل";
  static used = "مصرف شده";
  static remain = "باقیمانده";

  static new_extra_work_request = "ثبت درخواست اضافه کار";
  static extra_work_requests = "درخواست های اضافه کار";

  static mission_new_reports = "گزارش های جدید ماموریت";
  static mission_reply_status = "نتیجه بررسی گزارش";

  static approved_and_reg_vehicle_request = "تایید و ثبت درخواست نقلیه";

  static i_need = "دارم";
  static i_dont_need = "ندارم";

  static mission_targets = "مقصدهای ماموریت";
  static mission_target = "مقصد ماموریت";
  static mission_target_type = "نوع مقصد";
  static inside_province = "داخل استان";
  static outside_province = "خارج از استان";
  static mission_subject = "موضوع ماموریت";
  static need_vehicle = "نیاز به وسیله نقلیه";
  static need_hoteling = "نیاز به اقامتگاه";

  static transmission = "ترابری";
  static vehicles = "وسایل نقلیه";
  static vehicle = "وسیله نقلیه";
  static hoteling = "محل اقامت";
  static vehicle_types = "انواع وسایل نقلیه";
  static vehicle_type = "نوع وسیله نقلیه";
  static vehicle_brands = "برندها";
  static vehicle_brand = "برند خودرو";
  static vehicle_models = "مدل های خودرو";
  static brand = "برند";
  static model = "مدل";
  static product_year = "سال تولید";
  static pelak = "پلاک";

  static step_1 = "مرحله 1";
  static step_2 = "مرحله 2";
  static step_3 = "مرحله 3";
  static step_4 = "مرحله 4";

  static request_info = "اطلاعات درخواست";
  static swap_member_response = "پاسخ جانشین";
  static manager_response = "پاسخ مدیر";
  static official_response = "پاسخ اداری";
  static official_expert = "کارشناس اداری";
  static response_reg_date = "تاریخ ثبت پاسخ";
  static response_reg_time = "زمان ثبت پاسخ";
  static start = "شروع";
  static finish = "پایان";
  static basic_info = "اطلاعات اولیه";
  static manage_info = "مدیریت اطلاعات";

  static security_guard_reged_cards = "کنترل تردد نگهبانی";
  static my_reged_cards = "ترددهای من";
  static my_work_shifts = "شیفت های کاری من";
  static my_missions = "ماموریت های من";
  static my_vacations = "مرخصی های من";
  static vacation_replace_work_requests = "جانشینی های مرخصی";
  static mission_replace_work_requests = "جانشینی های ماموریت";
  static my_work_report = "گزارش کارکرد من";
  static official_experts = "کارشناسان اداری";
  static members_reged_cards = "ترددهای کارکنان";
  static members_work_shifts = "شیفت های کاری کارکنان";
  static members_missions = "ماموریت های کارکنان";
  static members_vacations = "مرخصی های کارکنان";
  static members_work_report = "گزارش کارکرد کارکنان";
  static members_vacations_check_manager = "مرخصی های جدید";
  static members_missions_check_manager = "ماموریت های جدید";
  static members_vacations_check_official = "مرخصی های جدید";
  static members_missions_check_official = "ماموریت های جدید";
  static requester = "متقاضی";
  static vacation_requests = "درخواست های مرخصی";
  static request_reg_date = "تاریخ درخواست";
  static request_reg_time = "زمان درخواست";
  static transfer_type = "نوع ترابری";
  static request_from_date = "درخواست از تاریخ";
  static request_to_date = "درخواست تا تاریخ";
  static mission_from_date = "ماموریت از تاریخ";
  static mission_to_date = "ماموریت تا تاریخ";
  static request_type = "نوع درخواست";

  static edu_levels = "مقاطع تحصیلی";
  static edu_level = "مقطع تحصیلی";
  static edu_fields = "رشته های تحصیلی";
  static edu_field = "رشته تحصیلی";
  static universities = "دانشگاه ها";
  static university = "دانشگاه";
  static employment_types = "انواع استخدام";
  static employment_type = "نوع استخدام";
  static employment_statuses = "وضعیت های استخدام";
  static employment_status = "وضعیت استخدام";
  static work_places = "محل های خدمت";
  static work_place = "محل خدمت";

  static dashboard = "داشبورد";
  //----
  static official = "اداری";
  //----
  static org_structure = "ساختار سازمانی";
  static departments = "دپارتمان ها";
  static department = "دپارتمان";
  static roles = "سمت ها";
  static role = "سمت";
  static companies = "شرکت ها";
  static company = "شرکت";
  static members = "کاربران";
  static member = "کاربر";
  static doctors = "پزشکان";
  static doctor = "پزشک";
  static patient_fullname = "نام بیمار";
  static employees = "کارکنان";
  static employee = "کارمند";
  static company_agents = "رابطین شرکت ها";
  static company_agent = "رابط شرکت";
  static comp_agents = "رابطین شرکت";
  static duty_levels = "سطوح وظایف";
  static duties = "شرح وظایف";
  static personal_duties = "شرح وظایف فردی";
  static role_duties = "شرح وظایف سمت";
  static duty_level = "سطح وظیفه";
  //---
  static provinces = "استان ها";
  static province = "استان";
  static cities = "شهرها";
  static city = "شهر";
  static expertises = "تخصص ها";
  static expertise = "تخصص";
  static sections = "بخش ها";
  static section = "بخش";
  static experts = "کارشناسان";
  static general_sections = "بخش های عمومی";
  static general_section = "بخش عمومی";
  static general_section_parts = "بخش های بخش عمومی";
  //---
  static security_guards = "نگهبان ها";
  static security_guard = "نگهبان";
  //---
  static daily_forms = "فرم روزانه";
  static acctive_beds = "تعداد تخت فعال";
  static extra_beds = "تعداد تخت اضافه";
  static in_patients = "تعداد بیمار بستری";
  static out_patients = "تعداد بیمار مرخص شده";
  static new_in_patients = "بیماران بستری شده جدید";
  static new_in_patients_from_section = "بیماران بستری شده جدید از بخش";
  static new_in_patients_from_hospital = "بیماران بستری شده جدید از بیمارستان";
  static discharged_patients = "بیماران مرخص شده";
  static discharged_patients_to_section = "بیماران مرخص شده به بخش";
  static discharged_patients_to_hospital = "بیماران مرخص شده به بیمارستان";
  static died_patients_on_24_hour = "تعداد بیمار فوت شده قبل از 24 ساعت";
  static died_patients_more_than_24_hour = "تعداد بیمار فوت شده بعد از 24 ساعت";
  static patients_less_than_six_hour = "تعداد بیماران با اقامت کمتر از 6 ساعت";
  static patients_between_6_and_24_hour = "تعداد بیمارن با اقمت بین 6 و 24 ساعت";
  static patients_in_7_morning = "تعداد بیمار بستری 7 صبح";
  static matching_beds_with_active_and_extra = "تطبیق چرخش تخت با تعداد تخت فعال و اضافه";
  static number_of_new_in_patient = "تعداد بیماران بستری شده جدید";
  //---
  static monthly_forms = "فرم آمار ماهانه"
  static birth_forms = "فرم درصد زایمان";
  static births = "تعداد کل زایمان";
  static natural_births = "تعداد زایمان طبیعی";
  static cesarean_births = "تعداد زایمان سزارین";
  static natural_births_factor_doctor = "زایمان طبیعی توسط پزشک";
  static natural_births_factor_midwife = "زایمان طبیعی توسط ماما";
  static cesarean_elective_cesareans = "سزارین انتخابی";
  static cesarean_previous_cesareans = "سزارین قبلی";
  static cesarean_abnormal_views = "نمای غیر طبیعی";
  static cesarean_fetal_distresses = "دیسترس جنینی";
  static cesarean_CPDs = "CPD";
  static cesarean_lack_Of_progresses = "عدم پیشرفت";
  static cesarean_multiple_childs = "چند قلویی";
  static cesarean_post_terms = "جفت سرراهی";
  static cesarean_placenta_previas = "";
  static cesarean_medical_and_surgical_causes = "علل طبی و جراحی و سایر علل";
  static cesOthers = "";
  static natural_birth_first_borns = "زایمان طبیعی در مادران نخستین زا";
  static cesarean_birth_first_borns = "زایمان سزارین در مادران نخستین زا";
  static first_borns_count = "ل مادران زایمان نخستین زا ( طبیعی + سزارین )";
  static natural_births_after_cesarean = "تعداد زایمان طبیعی بعد از سزارین (VBAC)";
  static natural_births_with_spinal_analgesia = "عداد زایمان طبیعی انجام شده با بی دردی اسپاینال";
  static natural_births_with_epidural_analgesia = "تعداد زایمان طبیعی انجام شده با بی دردی اپی دورال";
  static deaths_in_delivery_rome = "مرگ نوزاد در اتاق زایمان";
  static iUFDs = "IUFD";
  static multi_twin = "دو قلویی";
  static multi_triple = "سه قلویی";
  static multi_four_twins = "چهار قلویی";
  static multi_five_twins = "پنج قلویی";
  static multi_other_multi_twins = "چند قلویی";
  static multi_other_count = "تعداد چند قلوها";
  static live_births = "تعداد نوزاد زنده متولد شده";
  static natural_births_percent = "درصد زایمان طبیعی";
  static cesarean_births_percent = "درصد زایمان سزارین";
  //---
  static death_forms = "فرم فوت شدگان";
  static accept_date = "تاریخ پذیرش";
  static death_date = "تاریخ فوت";
  static death_cause = "علت مرگ";
  static file_number = "شماره پرونده";
  static icd10_category = "دسته بندی بر اساس ICD10";
  static under_five_age_death = "مرگ کودکان کمتر از 5 سال";
  static times_periods = "بازه زمانی مرگ";
  static mother_death = "مرگ مادر";
  static death_section = "بخش مرگ بیمار";
  //---
  static timex = "تایمکس";
  static timex_settings = "تنظیمات تایمکس";
  static security = "امنیت";
  static indexes = "شاخص ها";
  static vacations = "مرخصی ها";
  static missions = "ماموریت ها";
  static work_time_info = "اطلاعات تردد";
  static reports = "گزارش ها";
  //---
  static holidays = "تعطیلات";
  //---
  static page_accesses = "دسترسی صفحات";
  //---
  static automation = "اتوماسیون اداری";
  //---
  //---

  static messages = {
    operation_failed: "امکان انجام عملیات وجود ندارد",
    success_submit: "ثبت اطلاعات با موفقیت انجام شد",
    no_national_code: "کدملی وارد نشده است",
    page_not_found: "صفحه مورد درخواست شما یافت نشد",
    invalid_access_page: "متاسفانه مجاز به دیدن این صفحه نمی باشید",
    success_load_graph: "چارت سازمانی با موفقیت بارگذاری شد",
    card_reg_transfered_to_primary_list: "تردد به لیست اصلی انتقال یافت",
    your_response_not_submitted: "پاسخ شما ثبت نشده است",
    your_response_submitted: "پاسخ شما ثبت شد",
    swap_member_response_not_submitted:
      "پاسخ جانشین انتخابی کاربر ثبت نشده است",
    manager_response_not_submitted: "پاسخ مدیر ثبت نشده است",
    official_response_not_submitted: "پاسخ مسئول اداری ثبت نشده است",
    transmission_response_not_submitted: "پاسخ مسئول ترابری ثبت نشده است",
    your_report_submitted: "گزارش شما ثبت شد",
    no_report_submitted_yet: "گزارشی ثبت نشده است",
    your_report_deleted: "گزارش ماموریت شما حذف شد",
    no_note_submitted_yet: "یادداشتی ثبت نشده است",
    your_note_submitted: "یادداشت شما ثبت شد",
    note_deleted: "یادداشت مورد نظر حذف شد",
    no_response_submitted: "پاسخ # ثبت نشده است",
  };

  static questions = {
    sure_to_logout: "برای خروج از سامانه اطمینان دارید؟",
    sure_to_delete_item: "برای حذف رکورد انتخابی اطمینان دارید؟",
    sure_to_delete_image: "برای حذف تصویر اطمینان دارید؟",
    sure_to_transfer: "برای انجام انتقال اطمینان دارید؟",
    sure_to_submit_response_for_replace_work_request:
      "برای ثبت پاسخ درخواست جانشینی اطمینان دارید؟",
    sure_to_submit_response: "برای ثبت پاسخ درخواست اطمینان دارید؟",
    sure_to_submit_report: "برای ثبت گزارش اطمینان دارید؟",
    sure_to_submit_report_reply: "برای ثبت پاسخ گزارش اطمینان دارید؟",
    sure_to_delete_report: "برای حذف گزارش اطمینان دارید؟",
    sure_to_submit_note: "برای ثبت یادداشت ماموریت اطمینان دارید؟",
    sure_to_delete_note: "برای حذف یادداشت ماموریت اطمینان دارید؟",
  };

  static monthes = {
    farvardin: "فروردین",
    ordibehesht: "اردیبهشت",
    khordad: "خرداد",
    //---
    tir: "تیر",
    mordad: "مرداد",
    shahrivar: "شهریور",
    //---
    mehr: "مهر",
    aban: "آبان",
    azar: "آذر",
    //---
    dey: "دی",
    bahman: "بهمن",
    esfand: "اسفند",
  };
}

export default Words;
