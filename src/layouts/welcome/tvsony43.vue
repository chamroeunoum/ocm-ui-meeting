<template>
  <div class="screen-background">
    <div  class="schedule-panel">
      <div  class="schedule-header-panel bg-blue-500 flex w-full" :style=" ' height: '+headerHeight+'px; ' " >
        <div  class="schedule-logo-caption flex-grow flex flex-nowrap" :style=" ' height: '+( headerHeight - 6 )+'px; padding: 3px; ' " >
          <div  class="schedule-logo-panel" >
            <img  src="@assets/logo.png" class="w-full schedule-logo" :style=" ' height: '+ ( headerHeight -  6 ) +'px; width: auto;' " />
          </div>
          <div  class="schedule-caption font-moul font-normal w-full text-left text-gray-50 pl-4
            xs:text-xs 
            sm:text-sm 
            lg:text-lg 
            xl:text-xl 
            2xl:text-2xl 
            3xl:text-3xl 
            4xl:text-4xl 
            "
            :style="  'line-height: '+( headerHeight - 6 )+'px;' "
            >កាលវិភាគកិច្ចប្រជុំប្រចាំ {{ full_date }}</div>
          <digital-clock dgClass="digital-clock font-moul font-normal text-left text-gray-50 px-2
            xs:text-xs 
            sm:text-sm 
            lg:text-lg 
            xl:text-xl 
            2xl:text-2xl 
            3xl:text-3xl 
            4xl:text-4xl 
            "
            :style="  'line-height: '+( headerHeight - 6 )+'px;' " />
        </div>
        <!-- <div  class="digital-clock-panel flex-none" :style=" ' height: '+headerHeight+'px; ' " >
          <digital-clock dgClass="digital-clock font-ktr " />
        </div> -->
      </div>
      <div 
        class="schedule-table-panel bg-green-500" :style=" ' height: '+ (
          bodyHeight + ( meetingRecords != undefined && meetingRecords.length ? 0 : footerHeight )
        ) +'px; ' " >
        <Transition name="slide-fade" >
          <table 
            v-if="records.length" 
            class="schedule-table bg-gray-50 w-full " 
            :style=" ' height: '+ (
              bodyHeight + ( meetingRecords != undefined && meetingRecords.length ? 0 : footerHeight )
            ) +'px; ' " >
            <thead >
              <tr  class="border-b border-gray-200 ">
                <th  class="w-1/12 font-moul text-center p-2 font-normal
                  text-xxs 
                  xs:text-sm
                  sm:text-sm 
                  lg:text-sm
                  xl:text-sm
                  2xl:text-xl 
                  3xl:text-xl 
                  4xl:text-xl 
                ">ល.រ</th>
                <th  class="font-moul text-left p-2 font-normal
                  text-xxs 
                  xs:text-sm
                  sm:text-sm 
                  lg:text-sm
                  xl:text-sm
                  2xl:text-xl 
                  3xl:text-xl 
                  4xl:text-xl 
                ">ខ្លឹមសារ 
                <!-- {{ windowWidth + " - " + windowHeight + " / " + ( windowWidth - windowHeight )}} -->
              </th>
                <th  class="w-2/12 text-center font-moul p-2 font-normal
                  text-xxs 
                  xs:text-sm
                  sm:text-sm 
                  lg:text-sm
                  xl:text-sm
                  2xl:text-xl 
                  3xl:text-xl 
                  4xl:text-xl 
                ">ទីកន្លែង</th>
                <th  class="w-2/12 text-center font-moul p-2 font-normal
                  text-xxs 
                  xs:text-sm
                  sm:text-sm 
                  lg:text-sm
                  xl:text-sm
                  2xl:text-xl 
                  3xl:text-xl 
                  4xl:text-xl 
                ">ស្ថានភាព</th>
              </tr>
            </thead>
            <tbody >
              <tr v-for="(record,index) in records" :key="index" :class=" ' schedule-table-row ' + ( index % 2 ? ' row-odd ' : ' row-even ' )  ">
                <td  class="w-1/12 text-center font-moul meeting-index 
                xs:text-xs 
                sm:text-sm 
                lg:text-lg 
                xl:text-xl 
                2xl:text-2xl 
                3xl:text-3xl 
                4xl:text-4xl 
            ">{{ $toKhmer( ( recordsPerSchedulePage * activePage ) + ( index + 1 ) ) }}</td>
                <td  class="text-left relative">
                  <div  class="meeting-objective font-moul font-normal
                    absolute left-0 top-2 right-0 
                    text-xxs
                    xs:text-xxs 
                    sm:text-sm
                    lg:text-lg 
                    xl:text-xl 
                    2xl:text-2xl 
                    3xl:text-3xl 
                    4xl:text-4xl 
                  ">{{ record.objective }}</div>
                  <div class="flex absolute left-0 bottom-2 w-full" >
                    <div  class="meeting-leaders flex absolute left-0 bottom-0 ">
                      <div v-for="(listItem, index ) in record.listMembers" :key="index" class="font-moul meeting-leader 
                      text-xxxs 
                      xs:text-xxxs 
                      sm:text-xxs 
                      lg:text-sm
                      xl:text-sm
                      2xl:text-xl 
                      3xl:text-xl 
                      4xl:text-xl 
                    " >{{ (
                        listItem.member.officers != undefined && listItem.member.officers.length > 0 
                          ? ( 
                            ( listItem.member.officers[0].countesy != undefined ? listItem.member.officers[0].countesy.name : ''  ) + 
                            ( listItem.member.officers[0].position != undefined ? listItem.member.officers[0].position.name : ''  ) 
                          ) 
                          : ''
                      ) + ' ' + listItem.member.lastname + listItem.member.firstname 
                      }}</div>
                    </div>
                    <div  class="font-moul meeting-type absolute right-0 bottom-0 
                    text-xxxs 
                    xs:text-xxxs 
                    sm:text-xxs 
                    lg:text-sm
                    xl:text-sm
                    2xl:text-xl 
                    3xl:text-xl 
                    4xl:text-xl 
                    ">{{ record.type != undefined ? record.type.name : '' }}</div>
                  </div>
                </td>
                <td  class="w-2/12">
                  <div  class="font-moul meeting-date
                    text-xxxs 
                    xs:text-xxxs 
                    sm:text-xxs 
                    lg:text-sm
                    xl:text-sm
                    2xl:text-xl 
                    3xl:text-xl 
                    4xl:text-xl
                  ">{{ $toKhmer( record.date ) }}</div>
                  <div  class="font-moul meeting-time
                    text-xxxs 
                    xs:text-xxxs 
                    sm:text-xxs 
                    lg:text-sm
                    xl:text-sm
                    2xl:text-xl 
                    3xl:text-xl 
                    4xl:text-xl
                  ">{{ $toKhmer( record.start ) }}</div>
                  <div  class="font-moul meeting-rooms
                    text-xxxs 
                    xs:text-xxxs 
                    sm:text-xxs 
                    lg:text-sm
                    xl:text-sm
                    2xl:text-xl 
                    3xl:text-xl 
                    4xl:text-xl  
                  ">{{ record.rooms != undefined && record.rooms.length > 0 ? record.rooms.map( r => $toKhmer( r.name ) ).join( ' ' ) : '' }}</div>
                </td>
                <td  class="w-2/12" >
                  <div 
                    :class=" ( parseInt( record.status ) > 0 ? statuses.find( s => s.value == record.status ).color : ' bg-gray-400 ' ) + 
                    ' font-moul meeting-status rounded-full p-1 text-gray-100 ' +
                    ' text-xxxs xs:text-xxxs sm:text-xxs lg:text-sm xl:text-sm 2xl:text-xl 3xl:text-xl 4xl:text-xl'
                    ">{{ 
                    statuses.find( s => s.value == record.status ).label
                  }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </Transition>
      </div>
      <div 
        v-if="meetingRecords != undefined && meetingRecords.length" 
        class="schedule-footer-panel absolute left-0 bottom-0 right-0  bg-blue-500 z-40"
        :style=" ' height: '+footerHeight+'px; ' "
        >
        <Vue3Marquee >
          <div v-for="(meeting, index) in meetingRecords" :key="index" class="
          meeting-inprogress-panel font-moul font-normal text-gray-50
          xs:text-xs 
          sm:text-sm
          lg:text-lg
          xl:text-xl
          2xl:text-xl 
          3xl:text-xl 
          4xl:text-xl  
          " 
          :style="  'line-height: '+ headerHeight +'px;' "
          >{{ $toKhmer( index + 1 ) + ". " + meeting.objective }}</div>
        </Vue3Marquee>
      </div>
      <div 
        v-if="meetingRecords != undefined && meetingRecords.length" 
        class="schedule-footer-caption font-moul font-normal absolute left-0 bottom-0 bg-blue-500 text-gray-50 z-50 px-2 border-r border-gray-50
          xs:text-xs 
          sm:text-sm
          lg:text-lg
          xl:text-xl
          2xl:text-xl 
          3xl:text-xl 
          4xl:text-xl  
          " 
        :style=" ' height: '+footerHeight+'px; ' + 'line-height: '+ headerHeight +'px;' "
      >កំពុងប្រជុំ</div>
    </div>
    <!-- <div class="fixed bottom-0 right-0 left-0 text-lg font-bold" >{{ 
    windowWidth + " - " + windowHeight
    }}</div> -->
  </div>
</template>
<script>

import { ref, reactive , onMounted , computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import DigitalClock from '@components/widgets/DigitalClock.vue'
import { useNotification , useMessage } from 'naive-ui'
import { Vue3Marquee } from 'vue3-marquee'
import Crud from '@classes/Crud.js'

export default {
  name: 'TVSony43' ,
  components: {
    DigitalClock ,
    Vue3Marquee
  },
  setup(){
    /**
     * Components to use
     */
    const store = useStore()
    const router = useRouter()
    const notify = useNotification()
    const message = useMessage()
  
    const model = reactive({
      name: 'meeting' ,
      module: 'meetings' ,
      title: 'កិច្ចប្រជុំ'
    })

    const full_date = ref(null)

    const toggleLoginForm = ref(false)
    onMounted( () => {
      setTimeout( function(){
        toggleLoginForm.value = true
      } , 200 )
    })

    const statuses = reactive([
      {
        label: 'ទាំងអស់' ,
        value : null ,
        color: ' bg-gray-200 '
      },
      {
        label: 'មិនទាន់ប្រជុំ' ,
        value : 1 ,
        color: ' bg-blue-600 ' 
      } ,
      {
        label: 'កំពុងប្រជុំ' ,
        value : 2 ,
        color: ' bg-green-600 ' 
      } ,
      {
        label: 'នៅបន្ត' ,
        value : 4 ,
        color: ' bg-yellow-600 ' 
      } ,
      {
        label: 'ប្ដូរ' ,
        value : 8 ,
        color: ' bg-pink-600 ' 
      } ,
      {
        label: 'ពន្យាពេល' ,
        value : 16 ,
        color: ' bg-brown-600 ' 
      } ,
      {
        label: 'ចប់' ,
        value : 32 ,
        color: ' bg-gray-600 ' 
      }
    ])

    // onMounted( () => {
    //   // console.log( window.innerHeight )
    // })

    window.addEventListener("resize", reportWindowSize);
    const windowHeight = ref( window.innerHeight )
    const windowWidth = ref( window.innerWidth )
    function reportWindowSize(){
      windowHeight.value = window.innerHeight
      windowWidth.value = window.innerWidth
    }

    const headerHeight = computed(() => {
      return windowHeight.value * 0.08
    })
    const footerHeight = computed(() => {
      return windowHeight.value * 0.08
    })
    const bodyHeight = computed(() => {
      return windowHeight.value * 0.84
    })

    const recordsPerSchedulePage = ref( 
      5
      // Math.ceil( windowHeight.value / 100 ) 
    )
    const schedulePages = ref([])
    const activePage = ref(0)
    const records = ref([])
    const meetingRecords = ref([])
    function getScheduleMeeting(){
      store.dispatch( model.name+"/scheduleOnTv" , {
        page: 1 ,
        perPage: 100 ,
        search : "" 
      }).
      then( res => {
        chunkRecords( res.data.records )
      }).catch( err => {
        console.log( err )
      })
    }

    function chunkRecords( responseRecords ){
      schedulePages.value = []
      meetingRecords.value = []
      for( let i = 0 ; i < responseRecords.length; i++ ){
        responseRecords[i].status == 2 ? meetingRecords.value.push( responseRecords[i] ) : false
      }
      full_date.value = responseRecords[0].full_date
      for (let i = 0; i < responseRecords.length; i += recordsPerSchedulePage.value ) {
        schedulePages.value.push( responseRecords.slice(i, recordsPerSchedulePage.value + i) )
      }
      activePage.value = 0
      records.value = schedulePages.value[ activePage.value ]
      // activateSlide()
    }

    let interval = false
    let timeout = false
    function activateSlide(){
      // if( !interval ) clearInterval( interval )
      if( !interval ){
        interval = setInterval(() =>{
          records.value = [] 
          timeout = setTimeout( ()=>{
            console.log( "Timeout : " + timeout )
            activePage.value = activePage.value < ( schedulePages.value.length - 1 ) 
              ? activePage.value + 1
              : 0
            console.log( "Active page : " + activePage.value )
            records.value = schedulePages.value[ activePage.value ]
            clearTimeout( timeout )
            console.log( "Clear timeout : " + timeout )
          },500)
        },6000)
      }
    }
    // const crud = ref(null)
    // function getScheduleMeeting(){
    //   crud.value.list( 
    //     {
    //       // page: parseInt( pagination.value.page ) > 0 ? parseInt( pagination.value.page ) : 1 ,
    //       // perPage: parseInt( pagination.value.perPage ) > 0 ? parseInt( pagination.value.perPage ) : 10 ,
    //       // search : pagination.value.search != null && pagination.value.search != undefined && pagination.value.search != "" ? pagination.value.search : "" 
    //     },
    //     ( res ) => {
    //       window.clearTimeout()
    //     },
    //     ( error ) => {
    //       console.log( error )
    //     }
    //   )
    // }
    // store.commit( model.name+"/setColumns", [ 'id' , 'name' , 'desp' , 'active' , 'image' , 'pdf' , 'pid' , 'tpid' ] )
    // store.commit( model.name+"/setModel", {
    //   name: 'meeting' ,
    //   module: 'meetings' ,
    //   title: 'កិច្ចប្រជុំ'
    // })

    // crud.value = new Crud()
    // crud.value.setConfig( import.meta.env.VITE_API_SERVER , store.getters[model.name+'/model'] , store.getters[model.name+'/columns'].all )

    getScheduleMeeting()

    return {
      toggleLoginForm ,
      records ,
      schedulePages ,
      activePage ,
      recordsPerSchedulePage ,
      full_date ,
      statuses ,
      meetingRecords ,
      windowHeight ,
      windowWidth ,
      headerHeight ,
      footerHeight ,
      bodyHeight
    }
  }
}
</script>
<style scoped >
@media (min-width: 700px) {
  .screen-background {
    
  }
  .schedule-panel{
    
  }
  .schedule-header-panel {
    
  }
  .schedule-header-panel .schedule-logo-caption {
    
  }
  .schedule-header-panel .digital-clock-panel {
    
  }
  .schedule-header-panel .schedule-logo-panel {
    
  }
  .schedule-header-panel .schedule-logo-panel .schedule-logo {
    
  }
  .schedule-header-panel .schedule-logo-caption .schedule-caption {
    @apply text-sm;
  }
  .digital-clock-panel {
    
  }
  .digital-clock {
    @apply text-sm;
  }
  .schedule-table-panel {
    
  }
  .schedule-table {
    
  }
  .schedule-table thead tr th {
    @apply  p-2 text-xs;
  }
  .schedule-table .schedule-table-row {
    
  }
  .schedule-table .row-odd {
    @apply bg-gray-50;
  }
  .schedule-table .row-even {
    @apply bg-gray-100;
  }
  .schedule-table .meeting-index {
    @apply text-sm ;
  }
  .schedule-table .meeting-objective {
    @apply absolute top-2;
    font-size: 0.9rem;
    line-height: 1.4rem;
  }
  .schedule-table .meeting-leaders {
    @apply absolute bottom-0;
  }
  .schedule-table .meeting-leaders .meeting-leader {
    @apply text-xxs;
  }
  .schedule-table .meeting-type {
    @apply absolute bottom-0 text-xxs;
  }
  .schedule-table .meeting-date , .schedule-table .meeting-time , .schedule-table .meeting-rooms {
    @apply text-xs;
    line-height: 1rem;
  }
  .schedule-table .meeting-status {
    @apply text-xs p-2 ;
  }
  .schedule-footer-panel {
    
  }
  .schedule-footer-caption { 
    @apply text-4xl ;
  }
  .schedule-footer-panel .meeting-inprogress-panel {
    @apply text-4xl ;
  }
}
@media (min-width: 1000px) {
    .screen-background {
      
    }
    .schedule-panel{
      
    }
    .schedule-header-panel {
      
    }
    .schedule-header-panel .schedule-logo-caption {
      
    }
    .schedule-header-panel .digital-clock-panel {
      
    }
    .schedule-header-panel .schedule-logo-panel {
      
    }
    .schedule-header-panel .schedule-logo-panel .schedule-logo {
      
    }
    .schedule-header-panel .schedule-logo-caption .schedule-caption {
      @apply text-xl;
    }
    .digital-clock-panel {
      
    }
    .digital-clock {
      @apply text-xl;
    }
    .schedule-table-panel {
      
    }
    .schedule-table {
      
    }
    .schedule-table thead tr th {
      @apply text-xl p-3 ;
    }
    .schedule-table .schedule-table-row {
      
    }
    .schedule-table .row-odd {
      @apply bg-gray-50;
    }
    .schedule-table .row-even {
      @apply bg-gray-100;
    }
    .schedule-table .meeting-index {
      @apply text-xl ;
    }
    .schedule-table .meeting-objective {
      @apply text-lg absolute top-4;
      line-height: 2rem;
    }
    .schedule-table .meeting-leaders {
      @apply absolute bottom-1;
    }
    .schedule-table .meeting-leaders .meeting-leader {
      @apply text-sm;
    }
    .schedule-table .meeting-type {
      @apply absolute bottom-1 text-sm;
    }
    .schedule-table .meeting-date , .schedule-table .meeting-time , .schedule-table .meeting-rooms {
      @apply text-lg;
      line-height: 1.5rem;
    }
    .schedule-table .meeting-status {
      @apply text-lg p-2 ;
    }
    .schedule-footer-panel {
     
    }
    .schedule-footer-caption { 
      @apply text-4xl ;
    }
    .schedule-footer-panel .meeting-inprogress-panel {
      @apply text-4xl ;
    }
  }
@media (min-width: 1200px) {
    .screen-background {
      
    }
    .schedule-panel{
      
    }
    .schedule-header-panel {
      
    }
    .schedule-header-panel .schedule-logo-caption {
      
    }
    .schedule-header-panel .digital-clock-panel {
      
    }
    .schedule-header-panel .schedule-logo-panel {
      
    }
    .schedule-header-panel .schedule-logo-panel .schedule-logo {
      
    }
    .schedule-header-panel .schedule-logo-caption .schedule-caption {
      @apply text-xl;
    }
    .digital-clock-panel {
      
    }
    .digital-clock {
      @apply text-xl;
    }
    .schedule-table-panel {
      
    }
    .schedule-table {
      
    }
    .schedule-table thead tr th {
      @apply text-xl p-4 ;
    }
    .schedule-table .schedule-table-row {
      
    }
    .schedule-table .row-odd {
      @apply bg-gray-50;
    }
    .schedule-table .row-even {
      @apply bg-gray-100;
    }
    .schedule-table .meeting-index {
      @apply text-xl ;
    }
    .schedule-table .meeting-objective {
      @apply text-xl absolute top-3;
      line-height: 2rem;
    }
    .schedule-table .meeting-leaders {
      @apply absolute bottom-2;
    }
    .schedule-table .meeting-leaders .meeting-leader {
      @apply text-lg;
    }
    .schedule-table .meeting-type {
      @apply absolute bottom-2 text-lg;
    }
    .schedule-table .meeting-date , .schedule-table .meeting-time , .schedule-table .meeting-rooms {
      @apply text-lg;
      line-height: 1.5rem;
    }
    .schedule-table .meeting-status {
      @apply text-xl p-2 ;
    }
    .schedule-footer-panel {
     
    }
    .schedule-footer-caption { 
      @apply text-4xl ;
    }
    .schedule-footer-panel .meeting-inprogress-panel {
      @apply text-4xl ;
    }
  }
  @media (min-width: 1600px) {
    .screen-background {
      
    }
    .schedule-panel{
      
    }
    .schedule-header-panel {
      
    }
    .schedule-header-panel .schedule-logo-caption {
      
    }
    .schedule-header-panel .digital-clock-panel {
      
    }
    .schedule-header-panel .schedule-logo-panel {
      
    }
    .schedule-header-panel .schedule-logo-panel .schedule-logo {
      
    }
    .schedule-header-panel .schedule-logo-caption .schedule-caption {
      @apply text-4xl;
    }
    .digital-clock-panel {
      
    }
    .digital-clock {
      @apply text-4xl;
    }
    .schedule-table-panel {
      
    }
    .schedule-table {
      
    }
    .schedule-table thead tr th {
      @apply text-4xl p-6 ;
    }
    .schedule-table .schedule-table-row {
      
    }
    .schedule-table .row-odd {
      @apply bg-gray-50;
    }
    .schedule-table .row-even {
      @apply bg-gray-100;
    }
    .schedule-table .meeting-index {
      @apply text-4xl ;
    }
    .schedule-table .meeting-objective {
      @apply text-4xl absolute top-8;
      line-height: 4rem;
    }
    .schedule-table .meeting-leaders {
      @apply absolute bottom-4;
    }
    .schedule-table .meeting-leaders .meeting-leader {
      @apply text-3xl;
    }
    .schedule-table .meeting-type {
      @apply absolute bottom-4 text-3xl;
    }
    .schedule-table .meeting-date , .schedule-table .meeting-time , .schedule-table .meeting-rooms {
      @apply text-3xl;
      line-height: 3rem;
    }
    .schedule-table .meeting-status {
      @apply text-3xl p-6 ;
    }
    .schedule-footer-panel {
     
    }
    .schedule-footer-caption { 
      @apply text-4xl ;
    }
    .schedule-footer-panel .meeting-inprogress-panel {
      @apply text-4xl ;
    }
  }

  @media (min-width: 2500px) {
    .screen-background {
      
    }
    .schedule-panel{
      
    }
    .schedule-header-panel {
      
    }
    .schedule-header-panel .schedule-logo-caption {
      
    }
    .schedule-header-panel .digital-clock-panel {
      
    }
    .schedule-header-panel .schedule-logo-panel {
      
    }
    .schedule-header-panel .schedule-logo-panel .schedule-logo {
      
    }
    .schedule-header-panel .schedule-logo-caption .schedule-caption {
      @apply text-5xl;
    }
    .digital-clock-panel {
      
    }
    .digital-clock {
      @apply text-5xl;
    }
    .schedule-table-panel {
      
    }
    .schedule-table {
      
    }
    .schedule-table thead tr th {
      @apply text-4xl p-6;
    }
    .schedule-table .schedule-table-row {
      
    }
    .schedule-table .row-odd {
      @apply bg-gray-50;
    }
    .schedule-table .row-even {
      @apply bg-gray-100;
    }
    .schedule-table .meeting-index {
      @apply text-4xl ;
    }
    .schedule-table .meeting-objective {
      @apply text-4xl absolute top-10;
      line-height: 4rem;
    }
    .schedule-table .meeting-leaders {
      @apply absolute bottom-6;
    }
    .schedule-table .meeting-leaders .meeting-leader {
      @apply text-3xl;
    }
    .schedule-table .meeting-type {
      @apply text-3xl absolute bottom-6;
    }
    .schedule-table .meeting-date , .schedule-table .meeting-time , .schedule-table .meeting-rooms {
      @apply text-4xl;
      line-height: 4rem;
    }
    .schedule-table .meeting-status {
      @apply text-4xl p-6 ;
    }
    .schedule-footer-panel {
     
    }
    .schedule-footer-caption { 
      @apply text-5xl ;
    }
    .schedule-footer-panel .meeting-inprogress-panel {
      @apply text-5xl ;
    }
  }

  @media (min-width: 3200px) {
    .screen-background {
      
    }
    .schedule-panel{
      
    }
    .schedule-header-panel {
      
    }
    .schedule-header-panel .schedule-logo-caption {
      
    }
    .schedule-header-panel .digital-clock-panel {
      
    }
    .schedule-header-panel .schedule-logo-panel {
      
    }
    .schedule-header-panel .schedule-logo-panel .schedule-logo {
      
    }
    .schedule-header-panel .schedule-logo-caption .schedule-caption {
      @apply text-5xl;
    }
    .digital-clock-panel {
      
    }
    .digital-clock {
      @apply text-5xl;
    }
    .schedule-table-panel {
      
    }
    .schedule-table {
      
    }
    .schedule-table thead tr th {
      @apply text-5xl p-6;
    }
    .schedule-table .schedule-table-row {
      
    }
    .schedule-table .row-odd {
      @apply bg-gray-50;
    }
    .schedule-table .row-even {
      @apply bg-gray-100;
    }
    .schedule-table .meeting-index {
      @apply text-5xl ;
    }
    .schedule-table .meeting-objective {
      @apply text-5xl absolute top-12;
      line-height: 5rem;
    }
    .schedule-table .meeting-leaders {
      @apply absolute bottom-6;
    }
    .schedule-table .meeting-leaders .meeting-leader {
      @apply text-3xl;
    }
    .schedule-table .meeting-type {
      @apply text-3xl absolute bottom-6;
    }
    .schedule-table .meeting-date , .schedule-table .meeting-time , .schedule-table .meeting-rooms {
      @apply text-4xl ;
      line-height: 4rem;
    }
    .schedule-table .meeting-status {
      @apply text-4xl p-6;
    }
    .schedule-footer-panel {
     
    }
    .schedule-footer-caption { 
      @apply text-5xl ;
    }
    .schedule-footer-panel .meeting-inprogress-panel {
      @apply text-5xl ;
    }
  }
  @media (min-width: 3800px) {
    .screen-background {
      
    }
    .schedule-panel{
      
    }
    .schedule-header-panel {
      
    }
    .schedule-header-panel .schedule-logo-caption {
      
    }
    .schedule-header-panel .digital-clock-panel {
      
    }
    .schedule-header-panel .schedule-logo-panel {
      
    }
    .schedule-header-panel .schedule-logo-panel .schedule-logo {
      
    }
    .schedule-header-panel .schedule-logo-caption .schedule-caption {
      @apply text-6xl;
    }
    .digital-clock-panel {
      
    }
    .digital-clock {
      @apply text-6xl;
    }
    .schedule-table-panel {
      
    }
    .schedule-table {
      
    }
    .schedule-table thead tr th {
      @apply text-5xl p-8;
    }
    .schedule-table .schedule-table-row {
      
    }
    .schedule-table .row-odd {
      @apply bg-gray-50;
    }
    .schedule-table .row-even {
      @apply bg-gray-100;
    }
    .schedule-table .meeting-index {
      @apply text-5xl ;
    }
    .schedule-table .meeting-objective {
      @apply text-5xl absolute top-12;
    }
    .schedule-table .meeting-leaders {
      @apply absolute bottom-8;
    }
    .schedule-table .meeting-leaders .meeting-leader {
      @apply text-4xl;
    }
    .schedule-table .meeting-type {
      @apply text-4xl absolute bottom-8;
    }
    .schedule-table .meeting-date , .schedule-table .meeting-time , .schedule-table .meeting-rooms {
      @apply text-4xl;
      line-height: 4rem;
    }
    .schedule-table .meeting-status {
      @apply text-4xl p-8;
    }
    .schedule-footer-panel {
     
    }
    .schedule-footer-caption { 
      @apply text-5xl ;
    }
    .schedule-footer-panel .meeting-inprogress-panel {
      @apply text-5xl ;
    }
  }

</style>
