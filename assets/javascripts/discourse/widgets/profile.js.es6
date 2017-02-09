import { createWidget } from 'discourse/widgets/widget';
import { h } from 'virtual-dom';
import { avatarImg } from 'discourse/widgets/post';
import { cook } from 'discourse/lib/text';
import RawHtml from 'discourse/widgets/raw-html';
import showModal from 'discourse/lib/show-modal';
import Composer from 'discourse/models/composer';
import { getOwner } from 'discourse-common/lib/get-owner';
import NotificationsButton from 'discourse/components/notifications-button';



export default createWidget('nova', {
  tagName: 'div.nova.widget-container',
  buildKey: (attrs) => 'nova',

  defaultState(attrs) {
    return {
      topic: attrs.topic,
      bookmarked: attrs.topic ? attrs.topic.bookmarked : null
    }
  },

  canInviteToForum() {
    return Discourse.User.currentProp('can_invite_to_forum');
  },

  toggleBookmark() {
    this.state.bookmarked = !this.state.bookmarked
    const topicController = this.register.lookup('controller:topic')
    topicController.send('toggleBookmark')
  },

  sendShowLogin() {
    const appRoute = this.register.lookup('route:application');
    appRoute.send('showLogin');
  },

  sendShowCreateAccount() {
    const appRoute = this.register.lookup('route:application');
    appRoute.send('showCreateAccount');
  },

  showInvite() {
    const topicRoute = this.register.lookup('route:topic');
    topicRoute.send('showLogin');
  },

  createTopic() {
    const cController = this.register.lookup('controller:composer');
    const dtController = this.register.lookup('controller:discovery/topics');
    cController.open({
      categoryId: dtController.get('category.id'),
      action: Composer.CREATE_TOPIC,
      draftKey: dtController.get('model.draft_key'),
      draftSequence: dtController.get('model.draft_sequence')
    });
  },

  html(attrs, state) {
    const { currentUser } = this;
    const topic = state.topic;
    const cate = attrs.category;
    var days;
    let contents = [];
    

    var ghaza = 0 , tajrobe = 0, hava = 0;
    const path = getOwner(this).lookup('controller:application').get('currentPath');

    var target_date = new Date("Mar 12, 2017").getTime();
    var current_date = new Date().getTime();
    var seconds_left = (target_date - current_date) / 1000;
    days = parseInt(seconds_left / 86400);

    var v1 = 1, v2 = 1, v3 = 1, size = 0;
    if (path == "discovery.latest")
    {
        var data = Discourse.Category.list();
        console.log(data);
        for (var i = 0 ; i < data.length ; i++) 
          {
              if (data[i].id == 35 || data[i].id == 41 || data[i].id == 38 || data[i].id == 49) 
              {
                  ghaza = data[i].topic_count + ghaza;
                  v1++;
                  if(v1 == 5)
                  {
                    size = 20;
                    for (var j = 0; j < ghaza ; j++)
                    {
                        if (size < 150)
                            size = size + 1;
                    }
                    var strsizr = size + "px";
                    contents.push(h("a",{attributes: {href: "c/foodwaste"}},h("img.nova", {attributes: {src: "http://www.foodinsight.org/sites/default/files/styles/main_image_for_details/public/colorful%20foods_0.png",
                        width: strsizr, height: strsizr
                    }})));
                    contents.push(h("hr"));
                    contents.push(h("h3",["نوآ-001: کاهش هدر رفت غذا",h("sup", ghaza + " ")]));
                    contents.push(h("hr"));
                  }
              }
            else if (data[i].id == 50 || data[i].id == 51) 
            {
                tajrobe = data[i].topic_count + tajrobe;
                v2++;;
                if(v2 == 3)    
                {
                    size = 20;
                    for (var j = 0; j < tajrobe ; j++)
                    {
                        if (size < 150)
                            size = size + 1;
                    }
                    var strsizr = size + "px";
                    contents.push(h("a",{attributes: {href: "c/Experiences"}},h("img.nova", {attributes: {src: "/uploads/default/original/2X/d/d6958323043aa78b6d289e9d8921e204985a5b40.png",
                    width: strsizr, height: strsizr
                    }})));  
                    contents.push(h("hr"));
                    contents.push(h("h3",["نوآ-002: مستند سازی تجربه ها",h("sup", tajrobe + " ")]));
                    contents.push(h("hr"));
                }
            }
            else if (data[i].id == 59 || data[i].id == 58 || data[i].id == 57 || data[i].id == 61 || data[i].id == 60 || data[i].id == 62) 
            {
                hava = data[i].topic_count + hava;
                v3++;;
                    if (v3 == 7)
                    {    
                        size = 20;
                    for (var j = 0; j < hava ; j++)
                    {
                        if (size < 150)
                            size = size + 1;
                    }
                    var strsizr = size + "px";
                        contents.push(h("a",{attributes: {href: "c/pollution"}},h("img.nova", {attributes: {src: "http://cpmsarl.com/wp-content/uploads/2016/08/Romania-Start-up-plus-1.jpg",
                        width: strsizr, height: strsizr
                        }})));
                        contents.push(h("button.PayPingCheckout", {attributes:{onclick:"startt()"}}, "حمایت"));
                        contents.push(h("hr"));
                        contents.push(h("h3",{attributes: {style: "display:block"}},["نوآ-003: کاهش آلودگی هوا",h("sup", hava + " ")]));
                        contents.push(h("h4", days + "روز تا شروع"));
                        contents.push(h("hr"));
                    }
    
            }
          }
        
        if (currentUser) 
        {
            const username = currentUser.get("username");
            contents.push(this.attach("button",{
              className: "btn btn-default",
              label:"create.topic" ,
              icon: "plus",
              action: "createTopic"
        
            }));
        }
      else
      {
        contents.push(this.attach('button', {
              label: "sign_up",
              className: 'btn-primary sign-up-button',
              action: "sendShowCreateAccount"
            }));
      }
    }
    else if (path == "tags.show")
    {
        /*$.ajax({
          url: "/tags",
          dataType: 'json',
          async: false,
          success: function(data) {
            console.log(data);
          }
      });*/
      //var data = Discourse.Category.listByActivity();
      //console.log(data);
    }
    /*if (topic) 
    {

        if (currentUser) 
        {
            const username = currentUser.get("username");
            contents.push(
            avatarImg('large', {
            template: currentUser.get('avatar_template'),
            username: username
            }),h("hr"));
            contents.push(this.attach('topic-notifications-button', {
            topic: topic,
            appendReason: false,
            showFullTitle: true
          }));
        }
        else
        {
            contents.push(this.attach('button', {
              label: "sign_up",
              className: 'btn-primary sign-up-button',
              action: "sendShowCreateAccount"
            }));
        }
    }*/
    if (cate && topic == undefined) 
    {
        //console.log("Category");
    }

    


    return h('div.widget-inner', contents);
  }

});
