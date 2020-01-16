<template>
  <div>
      <div class="Board">
        <ul class="List BoardList">
            <li v-bind:key="item.id" v-for="item in screens" class="ListItem BoardItem">
                <h3 class="BoardTitle">
                    <a class="Link" v-bind:href="`/screen/edit/${item.id}`">{{item.title}}</a>
                </h3>
                <a class="Link BoardPicture" v-bind:href="`/screen/edit/${item.id}`">
                    <img alt="GeneratedByPicsum.Photos" class="Image BoardImage" v-bind:src="`https://picsum.photos/id/${item.picture}/800/400?grayscale`">
                </a>
                <div class="BoardGroup">
                    <a class="Link BoardTag" v-bind:class="item.status">{{item.status}}</a>
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
// import { TYPE_TEXT_ITEM, TYPE_HTML, TYPE_TEXT_ITEM, TYPE_FEED, TYPE_PICTURE } from "../utils/types";
import { STATUS_OFFLINE, STATUS_ONLINE } from "../utils/status";

export default {
  name: 'Profile',
  data () {
        return {
            screens: [{
                id: 1,
                title: "Entrance",
                status: STATUS_ONLINE,
                picture: 60
            },{
                id: 2,
                title: "Oval Office",
                status: STATUS_ONLINE,
                picture: 435
            },{
                id: 3,
                title: "MeetingRoom 1",
                status: STATUS_OFFLINE,
                picture: 91
            },{
                id: 4,
                title: "MeetingRoom 2",
                status: STATUS_OFFLINE,
                picture: 527
            },{
                id: 5,
                title: "MeetingRoom 3",
                status: STATUS_OFFLINE,
                picture: 5
            },{
                id: 6,
                title: "MeetingRoom 4",
                status: STATUS_OFFLINE,
                picture: 13
            },]
        }
    },
  components: {
  },
}
</script>