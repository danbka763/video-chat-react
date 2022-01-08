import {useParams} from 'react-router';
import useWebRTC, {LOCAL_VIDEO} from '../../hooks/useWebRTC';
import {translation, chat, sendMessage, openChat, closeWindow} from './functions'

import camera from '../../PNG/camera.png'
import delete_user from '../../PNG/delete_user.png'
import demonstration from '../../PNG/demonstration.png'
import info from '../../PNG/info.png'
import microphone_off from '../../PNG/microphone_off.png'
import microphone_on from '../../PNG/microphone_on.png'
import settings from '../../PNG/settings.png'
import share from '../../PNG/share.png'
import vc from '../../PNG/vc.png'

import "./main.css";

function layout(clientsNumber = 1) {
  const pairs = Array.from({length: clientsNumber})
    .reduce((acc, next, index, arr) => {
      if (index % 2 === 0) {
        acc.push(arr.slice(index, index + 2));
      }

      return acc;
    }, []);

  const rowsNumber = pairs.length;
  const height = `${100 / rowsNumber}%`;

  return pairs.map((row, index, arr) => {

    if (index === arr.length - 1 && row.length === 1) {
      return [{
        width: '100%',
        height,
      }];
    }

    return row.map(() => ({
      width: '50%',
      height,
    }));
  }).flat();
}

export default function Room() {
  const {id: roomID} = useParams();
  const {clients, provideMediaRef} = useWebRTC(roomID);
  const videoLayout = layout(clients.length);

  let clientName = [];
  clients.map((clientID) => {
    clientName.push(clientID === "LOCAL_VIDEO" ? <div>Me</div> : <div>{clientID}</div>)
  })
  return (
    <div>
      <aside>
        {/* left bar */}
        <div class="logo">
          <img src={vc} alt="logo" width="80"/>
        </div>
        <hr/>
        <p>ROOM USERS</p>
        <div class="users_name" id="users_name">
          {clientName}
        </div>
      </aside>

      <div class="right-block">
        <nav>
          <div class="name_room">
            ID room: #123456
          </div>
          <div class="icon">
            <img src={share} alt="share"/>
            <img src={info} alt="information"/>
            <img src={settings} alt="settings"/>
          </div>
        </nav>

        <section>

          <article class="video_block">
            <div class="relative_block settings_video">
              <img src={microphone_on} alt="microphone on"/>
              <img src={camera} alt="camera on"/>
              <img src={demonstration} alt="demonstration window"/>
            </div>
            <div class="translation">
              {clients.map((clientID, index) => {
                return (
                  <div key={clientID} style={videoLayout[index]} id={clientID}>
                    <video
                      width='100%'
                      height='100%'
                      ref={instance => {
                        provideMediaRef(clientID, instance);
                      }}
                      autoPlay
                      playsInline
                      muted={clientID === LOCAL_VIDEO}
                    />
                  </div>
                );
              })}
            </div>
          </article>

          <article class="chat_block">
            <div class="closeChat"><div class="close" onclick={() => closeWindow('chat')}></div></div>
            <div class="header_chat">
              <h2>Chat</h2>
            </div>
            <div class="chat">

              <div class="scroll-panel" id="scroll-panel">
                <p class="start_text_chat">Чат готов к работе</p>
              </div>

              <div class="message">
                <textarea type="text" name="message" id="message"></textarea>
                <button onclick={sendMessage}>Send</button>
              </div>
            </div>
          </article>

          <article class="chat_block-mobile-button">
            <button onclick={openChat}>open chat</button>
          </article>
        </section>
      </div>
      {
        <script>
          {translation()}
          {chat()}
        </script>
      }
    </div>
  );
}