<template>
  <div class="w-full" >
    <div class="w-full leading-9 font-moul -mt-12 mb-4 text-left pl-16" v-html="model.title" ></div>
    <!-- Top action panel of crud -->
    <div class="flex w-full title-bar border-b px-4 border-gray-200 py-4 ">
      <!-- Title of crud -->
      <div class="flex w-64 h-10 py-1 title" >
        <svg class="flex-none h-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 8h14v2H16z" fill="currentColor"></path><path d="M6 10.59L3.41 8L2 9.41l4 4l8-8L12.59 4L6 10.59z" fill="currentColor"></path><path d="M16 22h14v2H16z" fill="currentColor"></path><path d="M6 24.59L3.41 22L2 23.41l4 4l8-8L12.59 18L6 24.59z" fill="currentColor"></path></svg>
        <div class="leading-9 font-moul" >វត្តមានប្រចាំខែ</div>
      </div>
      <!-- Actions button of the crud -->
      <div class="flex-grow action-buttons flex-row-reverse flex p-2">
        <div @click="$router.push('/attendants/noshift')" class="py-1 h-10 px-6 leading-8 rounded-full mr-2 text-white bg-blue-500 cursor-pointer" >គ្មានវេន</div>
        <!-- <div v-if=" currentTimeslot != null " class="py-1 h-10 px-6 leading-8 rounded-full mr-2 text-white bg-red-500 cursor-pointer" @click="checkout" >ចេញវេន</div>
        <div v-if=" currentTimeslot != null " class="py-1 h-10 px-3 leading-8 rounded text-blue-600 mr-2 ">អ្នកកំពុងនៅក្នុងវេន ៖ {{ currentTimeslot != null ? currentTimeslot.title + " " + currentTimeslot.start + " ដល់ " + currentTimeslot.end : '' }}</div>
        <div v-if=" activeTimeslot != null && currentTimeslot == null " class="py-1 h-10 px-6 leading-8 rounded-full bg-blue-500 mr-2 text-white  cursor-pointer " @click="checkin" >ចូលវេន</div>
        <div v-if=" activeTimeslot != null && currentTimeslot == null " class="py-1 h-10 px-3 leading-8 rounded text-blue-600 mr-2 ">ពេលនេះគឺវេន ៖ {{ activeTimeslot != null ? activeTimeslot.title + " " + activeTimeslot.start + " ដល់ " + activeTimeslot.end : '' }}</div> -->
        <div v-if=" currentTimeslot != null " class="py-1 h-10 px-6 leading-8 rounded-full mr-2 text-white bg-red-500 cursor-pointer" @click="checkout" >ចេញវេន</div>
        <div v-if=" currentTimeslot != null " class="py-1 h-10 px-3 leading-8 rounded text-blue-600 mr-2 ">អ្នកកំពុងនៅក្នុងវេន ៖ {{ currentTimeslot != null ? currentTimeslot.title + " " + currentTimeslot.start + " ដល់ " + currentTimeslot.end : '' }}</div>
        <div v-if=" currentTimeslot == null " class="py-1 h-10 px-6 leading-8 rounded-full bg-blue-500 mr-2 text-white  cursor-pointer " @click="checkin" >ចូលវេន</div>
        <div v-if=" currentTimeslot == null " class="py-1 h-10 px-3 leading-8 rounded text-blue-600 mr-2 ">ពេលនេះគឺវេន ៖ {{ activeTimeslot != null ? activeTimeslot.title + " " + activeTimeslot.start + " ដល់ " + activeTimeslot.end : '' }}</div>
        <div class="py-3 h-10 px-3 leading-8" >
          <digital-clock />
        </div>
      </div>
    </div>
    <!-- Table of crud -->
    <div class="vcb-table-panel flex flex-wrap ">
      <div v-if=" table.records.matched instanceof Object " class="w-4/5 mx-auto my-8 flex flex-wrap justify-between" >
        <div class=" font-moul leading-7 text-blue-500" >{{  "ចំនួនថ្ងៃធ្វើការសរុប" }}<br/>{{ Object.keys(table.records.matched).length  }} ថ្ងៃ</div>
        <div class=" font-moul leading-7 text-blue-500" >{{  "ចំនួនម៉ោងត្រូវធ្វើការសរុប" }}<br/>{{ Object.values(table.records.matched).map( ( att ) => parseInt( att.calculateTime.total.duration ) ).reduce( (acc,val) => {return acc + val } , 0 ) }} នាទី</div>
        <div class=" font-moul leading-7 text-green-500" >{{  "ចំនួនម៉ោងបានធ្វើការសរុប" }}<br/>{{ Object.values(table.records.matched).map( ( att ) => parseInt( att.calculateTime.total.workedTime ) ).reduce( (acc,val) => {return acc + val } , 0 ) }} នាទី</div>
        <div class=" font-moul leading-7 text-yellow-500" >{{  "ចំនួនម៉ោងធ្វើការ ខ្វះ ឬ លើស សរុប" }}<br/>{{ Object.values(table.records.matched).map( ( att ) => parseInt( att.calculateTime.total.lateOrEarly ) ).reduce( (acc,val) => {return acc + val } , 0 ) }} នាទី</div>
      </div>
      <Transition name="slide-fade" >
        <div v-if=" table.records.matched instanceof Object " class="w-4/5 mx-auto flex flex-wrap justify-between" >
          <div class="w-full flex flex-wrap shadow border border-gray-300 rounded" >
            <div class="attendant-list w-full " >
              <div class="attendant-header flex bg-gray-200 h-14 leading-10 py-2" >
                <div class="attendant-header-row w-40 font-moul" >ថ្ងៃ</div>
                <div class="attendant-header-row flex-grow font-moul" >វេនធ្វើការ</div>
                <div class="attendant-header-row w-40 font-moul" >សរុប</div>
                <div class="attendant-header-row w-40 font-moul" >លើស / ខ្វះ</div>
              </div>
              <div v-for="(day, index) in daysOfMonth" :key='index' class="w-full" >
                <div v-if="table.records.matched[ day.date ] != undefined" class="flex day border-b border-gray-200 p-4" :style=" 'color: ' + ( daysOfWeek.find( (dow ) => dow.number == day.number ).color.hexa ) + '; ' " >
                  <div class="day-number w-40 p-4 font-kantumruy">
                    <div class="font-bold text-xl">{{ table.records.matched[ day.date ].date.split('-')[2] }}</div>
                    <div class="text-lg font-moul">{{ daysOfWeek.find( (dow ) => dow.number == day.number ).name.kh }}</div>
                  </div>
                  <div class="flex-grow p-4" >
                    <table class="w-full" >
                      <tr class="" >
                        <td class="font-kantumruy py-1 text-left font-bold">វេន</td>
                        <td class="font-kantumruy py-1 text-left font-bold">ចូល</td>
                        <td class="font-kantumruy py-1 text-left font-bold">ចេញ</td>
                        <td class="font-kantumruy py-1 text-right font-bold">សរុប</td>
                      </tr>
                      <tr v-for="(ct , ctIndex) in table.records.matched[ day.date ].calculateTime.checktimes" :key="ctIndex">
                        <td class=" py-1 text-left " >{{ ct.timeslot.title }} {{ ct.timeslot.start +'-'+ct.timeslot.end }}</td>
                        <td class=" py-1 text-left " >{{ ct.checkin }}</td>
                        <td class=" py-1 text-left " >{{ ct.checkout }}</td>
                        <td class=" py-1 text-right font-bold" >{{ ct.workedTime }}</td>
                      </tr>
                    </table>
                  </div>
                  <div class=" w-40 p-4 font-bold text-xl " >{{ table.records.matched[ day.date ].calculateTime.total.workedTime }}</div>
                  <div :class="'w-40 p-4 font-bold  text-xl ' + ( table.records.matched[ day.date ].calculateTime.total.lateOrEarly > 0 ? ' text-green-600 ' : ' text-red-600 ' )" >{{ table.records.matched[ day.date ].calculateTime.total.lateOrEarly }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
      <!-- Loading -->
      <Transition name="slide-fade" >
        <div v-if="table.loading" class="table-loading fixed flex h-screen left-0 top-0 right-0 bottom-0 bg-white bg-opacity-80 ">
          <div class="flex mx-auto items-center">
            <div class="spinner">
              <svg class="animate-spin w-16 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48s21.49-48 48-48s48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48s48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.491-48-48-48z" fill="currentColor"></path></svg>
              <br/><br/>កំពុងអាន...
            </div>
          </div>
          <div class="absolute top-1 right-1 cursor-pointer bg-white rounded-full " @click="closeTableLoading" >
            <svg class="w-14 mx-auto text-red-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320L192 192"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M192 320l128-128"></path></svg>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>
<script>
import { isAuth, getUser , authLogout } from './../../../plugins/authentication.js'
import { reactive, computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import QrcodeVue from 'qrcode.vue'
import Vue3Barcode from 'vue3-barcode'
import VuePdfEmbed from 'vue-pdf-embed'
import { useDialog, useMessage, useNotification } from 'naive-ui'
import dateFormat from 'dateformat'
import DigitalClock from './../../widgets/DigitalClock.vue'

export default {
  name: "Regulator" ,
  components: {
    DigitalClock ,
    QrcodeVue ,
    Vue3Barcode,
    VuePdfEmbed
  },
  setup(){
    var store = useStore()
    const dialog = useDialog()
    const message = useMessage()
    const notify = useNotification()
    const attendantDate = ref(null)
    attendantDate.value = (new Date()).getTime()
    const daysOfMonth = ref([])
    const timeslots = ref([])
    const activeTimeslot = ref(null)
    const currentTimeslot = ref(null)
    const currentChecktime = ref(null)
    const currentDay = ref(null)
    const daysOfWeek = reactive([
      {
        name: {
          kh: 'អាទិត្យ' ,
          en: 'Sunday' 
        },
        symbol: 'Bravery / Courage' ,
        color: {
          kh: 'ក្រហម' ,
          en: 'red' ,
          hexa: '#D80032' 
        } ,
        number: 0
      },
      {
        name: {
          kh: 'ច័ន្ទ' ,
          en: 'Monday' 
        },
        symbol: 'Equality' ,
        color: {
          kh: 'ទឹកក្រូច' ,
          en: 'orange' ,
          hexa: '#EC8F5E' 
        } ,
        number: 1
      },
      {
        name: {
          kh: 'អង្គារ៍' ,
          en: 'Tuesday' 
        },
        symbol: 'Honesty / Loyalty' ,
        color: {
          kh: 'ស្វាយ' ,
          en: 'Purple' ,
          hexa: '#B15EFF' 
        } ,
        number: 2
      },
      {
        name: {
          kh: 'ពុធ' ,
          en: 'Wednesday' 
        },
        symbol: 'Embodying justice' ,
        color: {
          kh: 'ត្រួយចេក' ,
          en: 'Mustard Green' ,
          hexa: '#79AC78' 
        } ,
        number: 3
      },
      {
        name: {
          kh: 'ព្រហស្បត៍' ,
          en: 'Thursday' 
        },
        symbol: 'Signifying hope' ,
        color: {
          kh: 'បៃតង' ,
          en: 'Green' ,
          hexa: '#004225' 
        } ,
        number: 4
      },
      {
        name: {
          kh: 'សុក្រ' ,
          en: 'Thursday' 
        },
        symbol: 'Forgiveness' ,
        color: {
          kh: 'ខៀវ' ,
          en: 'Blue' ,
          hexa: '#39A7FF' 
        } ,
        number: 5
      },
      {
        name: {
          kh: 'សៅរ៍' ,
          en: 'Thursday' 
        },
        symbol: 'Signifying sadness' ,
        color: {
          kh: 'ឈាមជ្រូក' ,
          en: 'Burgundy' ,
          hexa: '#952323' 
        } ,
        number: 6
      }
    ])
    /**
     * Variables
     */    
    const model = reactive( {
      name: "attendant" ,
      title: "វត្តមាន"
    })

    const table = reactive( {
      loading: false , 
      search: '' ,
      records: {
        all: [] ,
        matched: []
      },
      columns: {
        searchable: {
          username: '' ,
          firstname: '' ,
          lastname: '' ,
          email: '' ,
          phone: '' ,
          active: ''
        },
        format: {
          username: '' ,
          firstname: '' ,
          lastname: '' ,
          email: '' ,
          phone: '' ,
          active: ''
        }
      } ,
      pagination: {
        perPage: 50 ,
        page: 1 ,
        totalPages: 0 ,
        totalRecords: 0 ,
        start: 0 ,
        end: 0 ,
        buttons: []
      }
    })
    const filterPanel = ref(false)

    const today = computed(() => {
      return dateFormat( new Date( attendantDate.value ) , 'yyyy-mm-dd' )
    })

    function filterRecords(helper=true){
      if( helper ){
        table.records.matched = []
        if( table.search != "" ) {
          for(var index in table.records.all ){
            for(var field in table.records.all[index] ){
              if( (""+table.records.all[index][field]).includes( table.search ) !== false ) {
                table.records.matched.push( table.records.all[index] )
                break;
              }
            }
          }
        }
        if( table.records.matched.length <= 0 ) {
          table.records.matched = table.records.all
        }
      }else{
        setTimeout( goTo(1) , 500 )
      }
    }
    /**
     * Set active timeslot
     */
    function setActiveTimeslot(){
      // Set active timeslot compare to the current time
      let now = new Date();
      activeTimeslot.value = timeslots.value.find( (ts) => {
        let start = new Date( now.getFullYear() , now.getMonth() , now.getDate() , ts.start.split(':')[0] , ts.start.split(':')[1] )
        let end = new Date( now.getFullYear() , now.getMonth() , now.getDate() , ts.end.split(':')[0] , ts.end.split(':')[1] )
        return ( start.getTime() - 3600 ) <= now.getTime() && now.getTime() <= end.getTime()
      })
      // Set current timeslot that user is in
      // currentTimeslot
    }
    
    /**
     * Check in
     */
    function checkin(){
      let date = new Date()
      let day = dateFormat( date , 'yyyy-mm-dd' )
      let time = dateFormat( date , 'HH:MM' )
      
      dialog.info({
          title: "វត្តមាន",
          content: "ចូលធ្វើការ?",
          positiveText: "បាទ / ចាស",
          negativeText: "ទេ",
          maskClosable: false,
          closable: false ,
          closeOnEsc: false ,
          onMaskClick: () => {
            message.warning("សូមជ្រើសរើសជម្រើសណាមួយជាមុនសិន។");
          },
          onEsc: () => {
            message.warning("សូមជ្រើសរើសជម្រើសណាមួយជាមុនសិន។");
            return false
          },
          onNegativeClick: () => {
            
          },
          onPositiveClick: () => {
            store.dispatch('attendant/checkinwithsystem',{
              day: day ,
              time: time ,
              timeslot_id: activeTimeslot.value.id ,
              meta: 'Browser'
            }).then( res => {
              console.log( res )
              if( res.data.ok ){
                notify.success( {
                  title: "វត្តមាន" ,
                  description: 'ជោគជ័យ' ,
                  content: "បានកត់ត្រាម៉ោងចូលធ្វើការរូចរាល់។" ,
                  meta: '',
                  duration: 3000
                } )
                getRecords()
              }else{
                notify.error( {
                  title: "វត្តមាន" ,
                  description: 'មានហញ្ហា' ,
                  content: "មានបញ្ហាក្នុងពេលកត់ត្រាម៉ោងចូលធ្វើការរូចរាល់។" ,
                  meta: ''
                } )
              }
            })
            .catch( err => {
              notify.error( {
                  title: "វត្តមាន" ,
                  description: 'មានហញ្ហា' ,
                  content: err ,
                  meta: ''
                } )
            })
          }
        });
      
      console.log( day + " " + time )
    }

    function checkout(){
      let date = new Date()
      let day = dateFormat( date , 'yyyy-mm-dd' )
      let time = dateFormat( date , 'HH:MM' )
      
      dialog.info({
          title: "វត្តមាន",
          content: "ចេញពីធ្វើការ?",
          positiveText: "បាទ / ចាស",
          negativeText: "ទេ",
          maskClosable: false,
          closable: false ,
          closeOnEsc: false ,
          onMaskClick: () => {
            message.warning("សូមជ្រើសរើសជម្រើសណាមួយជាមុនសិន។");
          },
          onEsc: () => {
            message.warning("សូមជ្រើសរើសជម្រើសណាមួយជាមុនសិន។");
            return false
          },
          onNegativeClick: () => {
            
          },
          onPositiveClick: () => {
            store.dispatch('attendant/checkoutwithsystem',{
              day: day ,
              time: time ,
              timeslot_id: currentTimeslot.value.id ,
              checktime_id: currentChecktime.value.checkin_id ,
              meta: 'Browser' 
            }).then( res => {
              if( res.data.ok ){
                notify.success( {
                  title: "វត្តមាន" ,
                  description: 'ជោគជ័យ' ,
                  content: "បានកត់ត្រាម៉ោងចេញធ្វើការរូចរាល់។" ,
                  meta: '',
                  duration: 3000
                } )
                getRecords()
              }else{
                notify.error( {
                  title: "វត្តមាន" ,
                  description: 'មានបញ្ហា' ,
                  content: "មានបញ្ហាក្នុងពេលកត់ត្រាម៉ោងចេញធ្វើការរូចរាល់។" ,
                  meta: '' 
                } )
              }
            })
            .catch( err => {
              notify.error( {
                  title: "វត្តមាន" ,
                  description: 'មានបញ្ហា' ,
                  content: err ,
                  meta: ''
                } )
            })
          }
        });
      
      console.log( day + " " + time )
    }

    /**
     * Functions
     */
    function getRecords(){
      /**
       * Clear time interval after calling
       */
      window.clearTimeout()
      table.loading = true
      store.dispatch(model.name+'/list',{
        userId: getUser().id ,
        search: table.search ,
        perPage: table.pagination.perPage ,
        page: table.pagination.page ,
        date: attendantDate.value != null && attendantDate.value > 0 ? dateFormat( new Date( attendantDate.value ) , 'yyyy-mm-dd' ) : dateFormat( new Date() , 'yyyy-mm-dd' )
      }).then(res => {
        table.records.all = table.records.matched = res.data.records
        table.pagination = res.data.pagination
        daysOfMonth.value = res.data.daysOfMonth.reverse()
        timeslots.value = res.data.timeslots
        var paginationNumberList = 5
        if( ( table.pagination.page - ( paginationNumberList - 1 ) ) < 1 ){
          table.pagination.start = 1
          table.pagination.end = table.pagination.totalPages > 9 ? 9 : table.pagination.totalPages
        }
        else{
          table.pagination.start = table.pagination.page  - ( paginationNumberList - 1 )
          table.pagination.end = table.pagination.page + 4 >= table.pagination.totalPages ? table.pagination.totalPages : table.pagination.page + 4
        }
        /**
         * Create pagination buttons
         */
        table.pagination.buttons = []
        for(var i=table.pagination.start;i<=table.pagination.end;i++){
          table.pagination.buttons.push(i)
        }

        activeTimeslot.value = null
        currentTimeslot.value = null
        currentChecktime.value = null

        setToday()
        setActiveTimeslot()
        closeTableLoading()
      }).catch( err => {
        console.log( err )
      })
    }

    function closeTableLoading(){
      table.loading = false
    }

    /**
     * Pagination functions
     */
    function previous(){
      goTo( table.pagination.page <= 1 ? 1 : table.pagination.page - 1 )
    }
    function next(){
      goTo( table.pagination.page >= table.pagination.totalPages ? table.pagination.totalPages : table.pagination.page + 1 )
    }
    function goTo(page){
      table.pagination.page = page > table.pagination.totalPages ? table.pagination.totalPages : ( page < 1 ? 1 : page)
      getRecords()
    }
    function goToMonth(month){
      let date = new Date()
      date.setMonth(month-1)
      date.setDate(1)
      attendantDate.value = date.getTime()
      getRecords()
    }
    function updatePerpage(perPage){
      table.pagination.perPage = perPage < 5 ? 5 : ( perPage > 100 ? 100 : perPgae )
      table.pagination.page = 1
      getRecords()
    }
    const paginationButtons = computed(()=>{
      /**
       * 9 Buttons is recommended
       */
      return table.pagination.totalPages ? table.pagination.totalPages : 0
    })

    /**
     * Mark the matched text with in search box
     */
     function applyTagMark(str){
      // Split the string by whitespace
      if( table.search.trim() != "" ){
        var arrStrSearch = table.search.split(/(\s+)/).filter( e => e.trim().length > 0).map( e => e.replaceAll(" ","") )
        for( var i in arrStrSearch ){
          if( str.includes( arrStrSearch[i] ) ) str = str.replaceAll( arrStrSearch[i] , '<mark>' + arrStrSearch[i] + '</mark>' ) 
        }
      }
      return str
    }

    function getDayOfWeek(number){
      return daysOfWeek.find( day => day.number == number )
    }

    function isToday(date) {
      // 1 => Today , 2 Before today , 4 after today
      let now = new Date()
      now.setHours(0)
      now.setMinutes(0)
      now.setSeconds(0)
      now.setMilliseconds(0)
      let today = new Date(date)
      today.setHours(0)
      today.setMinutes(0)
      today.setSeconds(0)
      today.setMilliseconds(0)
      return ( now.getTime() - today.getTime() ) > 0
        // Before today
        ? 2
        : ( 
          ( now.getTime() - today.getTime() ) < 0
          // After Today
          ? 4
          // After today
          : 1
        )
    }

    function setToday(){
      currentDay.value = null
      for(var index in table.records.all ){
        if( isToday( table.records.all[ index ].date ) == 1 ){
          currentDay.value = table.records.all[ index ]
          /**
           * Track the current timeslot that is currently working on
           */
          for(var cIndex in currentDay.value.calculateTime.checktimes ){
            currentChecktime.value = currentDay.value.calculateTime.checktimes[ cIndex ];
            // If the checktime checkout is null then it is meant the checktime does not checkout yet
            if( currentChecktime.value.checkout == null ){
              currentTimeslot.value = currentChecktime.value.timeslot
              break;
            }
          }
          break;
        }
      }
    }

    /**
     * Initial the data
     */
    getRecords()


    return {
      /**
       * Variables
       */
      model ,
      table ,
      filterPanel ,
      daysOfMonth ,
      daysOfWeek ,
      attendantDate ,
      today ,
      timeslots ,
      activeTimeslot ,
      currentTimeslot ,
      currentChecktime ,
      /**
       * Table
       */
      filterRecords ,
      /**
       * Pagination functions
       */
      updatePerpage ,
      goTo ,
      previous ,
      next ,
      paginationButtons ,
      /**
       * Loading overlay
       */
      closeTableLoading ,
      /**
       * Functions
       */
      applyTagMark ,
      goToMonth ,
      getDayOfWeek ,
      isToday ,
      checkin ,
      checkout,
      dateFormat
    }
  }
}

</script>
